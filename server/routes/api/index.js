const express = require('express')
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const router = express.Router()
const app = express()

const sendGridKey = ''
sgMail.setApiKey(sendGridKey);

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

//Load Data From MongoDB
const loadUsers = async function () {
  const client = await mongodb.MongoClient.connect(
    'mongodb://lekka:lekka123@ds046377.mlab.com:46377/collegehub', {
      useNewUrlParser: true
    }
  )
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
    await users.insertOne({
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isSeeker: req.body.isSeeker,
      isConfirmed: false,
      confirmationKey: key,
      location: req.body.location,
      houses_owned: req.body.houses_owned,
      house_id: req.body.house_id,
      house_no: req.body.house_no,
      street: req.body.street,
      surbub: req.body.surbub,
      requests_made: req.body.requests_made,
      createdAt: new Date()
    })
    const msg = {
      to: req.body.email,
      cc: "tinashe@lekkahub.com",
      from: 'Collegehub <noreply@collegehub.co.zw>',
      subject: 'Collegehub: Please confirm your email',
      html: '<h2>Hi, ' + req.body.first_name + '</h2><p>Thank you for creating your account at Collegehub. Please confirm your email by <a href="https://www.lekkahub.com/confirm-signup/' + key + '" title="Collegehub">clicking this link</a></p><p>Regards</p>',
    }
    sgMail.send(msg)
    res.status(201).json({
      message: 'Your account has been created. A confirmation email has been sent to ' + req.body.email
    })
  }
})

//Email Confirmation
router.post('/confirm-signup/:id', async (req, res) => {
  const users = await loadUsers()
  if (await users.findOne({"confirmationKey": req.params.id})) {
    await users.findOneAndUpdate(
      {"confirmationKey": req.params.id},
      {$set: {"isConfirmed": true}},
      {upsert: true,}
    )
    const msg = {
      to: req.body.email,
      cc: "tinashe@lekkahub.com",
      from: 'Collegehub <noreply@collegehub.co.zw>',
      subject: 'Collegehub: Your email account has been confirmed',
      html: '<h2>Hi, ' + req.body.first_name + '</h2><p>Your email has successfully been confirmed</p><p>Regards</p></p><p>Collegehub</p>',
    }
    sgMail.send(msg)
    var user = await users.findOne({"confirmationKey": req.params.id})
    if (user.isConfirmed)
      res.send(user)
    else {
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
    return res.json({user})
  }
  res.status(401).json({message: 'Incorrect login credentials'})
})

//Logout User
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ok: true})
})

//Get All Users
router.get('/allusers', async (req, res) => {
  const users = await loadUsers()
  res.send(await users.find({}).toArray())
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
    return res.json({user})
  }
  res.status(401).json({
    message: 'User Not Found or has not yet confirmed'
  })
})

router.post('/profile/edit/:id', async (req, res) => {
  const users = await loadUsers()
  if (await users.findOne({ "username": req.params.id, "isConfirmed": true})) {
    let params = { updatedAt: new Date() }
    await users.findOneAndUpdate(
      {"username": req.params.id},
      {$set: Object.assign(params, req.body)},
      {upsert: true,}
    )
    res.status(201).json({message: 'Updated Successfully'})
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
