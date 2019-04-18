const express = require('express')
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const router = express.Router()
const app = express()
require('dotenv').config()

aws.config.update({
  secretAccessKey: process.env.awsSecretAccessKey,
  accessKeyId: process.env.awsAccessKeyId,
  region: process.env.awsRegion
})

const s3 = new aws.S3()

const sendGridKey = process.env.sendGridKey
sgMail.setApiKey(sendGridKey);

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

//Load Users From MongoDB
const loadUsers = async function () {
  const client = await mongodb.MongoClient.connect(process.env.database, {useNewUrlParser: true})
  return client.db('collegehub').collection('users')
}

//Account Signup
router.post('/signup', async (req, res) => {
  var key = null;
  const users = await loadUsers()
  if (await users.findOne({email: req.body.email})) {
    res.status(401).json({message: 'Email is already in use'})
  } else if (await users.findOne({username: req.body.username})) {
    res.status(409).json({message: 'Username is already in use'})
  } else {
    key = (Math.floor(1000 + Math.random() * 9000)) + '-' + req.body.email
    const msg = {
      to: req.body.email,
      cc: "collegehubzw@gmail.com",
      from: 'Collegehub <noreply@collegehub.co.zw>',
      subject: 'Collegehub: Please confirm your email',
      html: '<h2>Hi, ' + req.body.firstname + '</h2><p>Thank you for creating your account at Collegehub. Please confirm your email by <a href="https://www.lekkahub.com/confirm-signup/' + key + '" title="Collegehub">clicking this link</a></p><p>Regards</p>',
    }
    if(sgMail.send(msg)){
      await users.insertOne({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isSeeker: req.body.isSeeker,
        isConfirmed: false,
        confirmationKey: key,
        profileImage: null,
        dob: null,
        phone: null,
        sex: null,
        createdAt: new Date()
      })
    }
    if(req.xhr)
      return res.status(201).json({message: 'Your account has been created. A confirmation email has been sent to ' + req.body.email})
    else
      return res.status(403).json({message: 'Not Authorised'})
  }
})

//Email Confirmation
router.post('/confirm-signup/:id', async (req, res) => {
  const users = await loadUsers()
  var user = null
  if (user = await users.findOne({"confirmationKey": req.params.id})) {
    await users.findOneAndUpdate(
      {"confirmationKey": req.params.id},
      {$set: {"isConfirmed": true}},
      {upsert: true,}
    )
    const msg = {
      to: user.email,
      cc: "collegehubzw@gmail.com",
      from: 'Collegehub <noreply@collegehub.co.zw>',
      subject: 'Collegehub: Your email account has been confirmed',
      html: '<h2>Hello, ' + user.firstname + '</h2><p>Your email has successfully been confirmed</p><p>Regards</p></p><p>Collegehub</p>',
    }
    sgMail.send(msg)
    var user = await users.findOne({"confirmationKey": req.params.id})
    if (user.isConfirmed){
      if(req.xhr)
        return res.json({user})
      else
        return res.status(403).json({message: 'Not Authorised'})
    }else {
      res.status(400).json({message: 'Does not exist!'})
    }
  } else {
    res.status(400).json({message: 'Does not exist!'})
  }
})

//Login User
router.post('/login', async (req, res) => {
  const users = await loadUsers()
  var user = null;
  if (user = await users.findOne({"email": req.body.email,"password": req.body.password})) {
    req.session.authUser = {user: user}
    if(req.xhr)
      return res.json({user})
    else
      return res.status(403).json({message: 'Not Authorised'})
  }
  res.status(401).json({message: 'Incorrect login credentials'})
})

//Forgot Password
router.post('/forgot-password', async (req, res) => {
  const users = await loadUsers()
  var key = null;
  var user = '';
  if (user = await users.findOne({"email": req.body.email})) {
    key = (Math.floor(1000 + Math.random() * 9000)) + '-' + req.body.email
    await users.findOneAndUpdate(
      {"email": req.body.email},
      {$set: {"password-reset-status": true, "password-reset-code": key}},
      {upsert: true,}
    )
    const msg = {
      to: user.email,
      cc: "collegehubzw@gmail.com",
      from: 'Collegehub <noreply@collegehub.co.zw>',
      subject: 'Collegehub: Reset Your Password',
      html: '<h2>Hi, ' + user.firstname + '</h2><p>It seems you forgot your password. Please <a href="https://www.lekkahub.com/reset-password/' + key + '" title="Collegehub">clicking this link</a> to reset your password.</p><p>Regards</p>',
    }
    sgMail.send(msg)
    if(req.xhr)
      return res.status(201).json({message: 'A Reset Passwoord email has been sent to your email'})
    else
      return res.status(403).json({message: 'Not Authorised'})
  } else {
    res.status(400).json({message: 'Email does not exist!'})
  }
})

//Reset Password
router.post('/reset-password/:id', async (req, res) => {
  const users = await loadUsers()
  var user = '';
  if (user = await users.findOne({"password-reset-code": req.params.id})) {
    await users.findOneAndUpdate(
      {"password-reset-code": req.params.id},
      {$set: {"password-reset-status": false, "password": req.body.password}},
      {upsert: true,}
    )
    const msg = {
      to: user.email,
      cc: "collegehubzw@gmail.com",
      from: 'Collegehub <noreply@collegehub.co.zw>',
      subject: 'Collegehub: Reset Your Password',
      html: '<h2>Hi, ' + user.firstname + '</h2><p>Your password has been reset. Your new password is: <strong>'+ req.body.password +'</strong>.<br>Go to <a href="https://www.lekkahub.com" title="Collegehub">Collegehub</a> and login.</p><p>Regards</p>',
    }
    sgMail.send(msg)
    if(req.xhr)
      return res.status(201).json({message: 'Password successfully reset!'})
    else
      return res.status(403).json({message: 'Not Authorised'})
  } else {
    res.status(401).json({message: 'Email does not exist!'})
  }
})

//Logout User
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ok: true})
})

//Get All Users
router.post('/allusers', async (req, res) => {
  const users = await loadUsers()
  if(req.xhr)
    return res.send(await users.find({}).toArray())
  else
    return res.status(403).json({message: 'Not Authorised'})
})

//Delete User
router.delete('/delete/:id', async (req, res) => {
  const users = await loadUsers()
  await users.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(201).json({
    message: req.params.id + ' has been deleted'
  })
})

//Get a user
router.post('/profile/:id', async (req, res) => {
  const users = await loadUsers()
  var user = null
  if (user = await users.findOne({ "username": req.params.id, "isConfirmed": true})) {
    if(req.xhr)
      return res.json({user})
    else
      return res.status(403).json({message: 'Not Authorised'})
  }else{
    return res.status(401).json({message: 'User Not Found or has not yet confirmed'})
  }
})

//Edit profile
router.post('/profile/edit/:id', async (req, res) => {
  const users = await loadUsers()
  if (await users.findOne({ "username": req.params.id, "isConfirmed": true})) {
    let params = { updatedAt: new Date() }
    await users.findOneAndUpdate(
      {"username": req.params.id},
      {$set: Object.assign(params, req.body)},
      {upsert: true,}
    )
    var user = null
    if (user = await users.findOne({ "username": req.params.id, "isConfirmed": true})) {
      if(req.xhr)
        return res.json({user})
      else
        return res.status(403).json({message: 'Not Authorised'})
    }
  }else{
    res.status(401).json({
      message: 'User Not Found or has not yet confirmed'
    })
  }
})

//Image Upload

 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'collegehub',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'Profile Image'});
    },
    key: function (req, file, cb) {
      cb(null, 'profileImages/' + Date.now().toString() + file.originalname)
    }
  })
})

router.post('/profile/upload/image/:id', upload.single('profileImage'), async (req, res, next) => {
  const users = await loadUsers()
  var user = null
  let params = {
    profileImage: {
      "fieldname": req.file.fieldname,
      "originalname": req.file.originalname,
      "encoding": req.file.encoding,
      "mimetype": req.file.mimetype,
      "size": req.file.size,
      "bucket": req.file.bucket,
      "key": req.file.key,
      "acl": req.file.acl,
      "contentType": req.file.contentType,
      "contentDisposition": req.file.contentDisposition,
      "storageClass": req.file.storageClass,
      "serverSideEncryption": req.file.serverSideEncryption,
      "metadata": {
          "fieldName": req.file.metadata.fieldName
      },
      "location": req.file.location,
      "etag": req.file.etag,
      "path": "https://s3.amazonaws.com/collegehub/" + req.file.key
    }
  }
  await users.findOneAndUpdate(
    {"username": req.params.id},
    {$set: Object.assign(params)},
    {upsert: true,}
  )
  user = await users.findOne({ "username": req.params.id})
  if(req.xhr)
    return res.json({user})
  else
    return res.status(403).json({message: 'Not Authorised'})
})

//Change Username
router.post('/profile/edit/username/:id', async (req, res) => {
  const users = await loadUsers()
  if (await users.findOne({ "email": req.params.id, "isConfirmed": true})) {
    let params = { updatedAt: new Date() }
    await users.findOneAndUpdate(
      {"email": req.params.id},
      {$set: Object.assign(params, req.body)},
      {upsert: true,}
    )
    var user = null
    if (user = await users.findOne({ "email": req.params.id, "isConfirmed": true})) {
      const msg = {
        to: req.params.id,
        cc: "collegehubzw@gmail.com",
        from: 'Collegehub <noreply@collegehub.co.zw>',
        subject: 'Collegehub: Your Username has successfully been changed',
        html: '<h2>Hi, ' + user.firstname + '</h2><p>Your username has successfully been changed to ' + user.username + '. Please follow <a href="https://www.lekkahub.com/profile/' + user.username + '" title="Profile">this link</a> to check out your profile</p><p>Regards</p>',
      }
      sgMail.send(msg)
      if(req.xhr)
        return res.json({user})
      else
        return res.status(403).json({message: 'Not Authorised'})
    }
  }else{
    res.status(401).json({
      message: 'User Not Found or has not yet confirmed'
    })
  }
})




export default {
  path: '/users',
  handler: router
}
