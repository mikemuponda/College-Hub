const express = require('express')
require('dotenv').config()
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const urlShortener = require('node-url-shortener')
const fs = require('fs');
const util = require('util');
const router = express.Router()
const app = express()
const url = process.env.URL
const client = require('twilio')(process.env.twilioSID, process.env.twilioAUTH);
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.google_clientID);
var date = new Date()
var logsOut = fs.createWriteStream('logs/' + date.getFullYear() + '-' + date.getMonth() + '.log', { flags: 'a' });
//var log_stdout = process.stdout;
console.log = function(d) { //
    logsOut.write(util.format(d) + '\n');
};

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
const loadUsers = async function() {
    try {
        const client = await mongodb.MongoClient.connect(process.env.database, { useNewUrlParser: true })
        return client.db('collegehub').collection('users')
    } catch (e) {
        console.log(e);
    }
}

//Account Signup
router.post('/signup', async(req, res) => {
    var key = null;
    const users = await loadUsers()
    if (await users.findOne({ email: req.body.email })) {
        res.status(401).json({ message: 'Email is already in use' })
    } else if (await users.findOne({ username: req.body.username })) {
        res.status(409).json({ message: 'Username is already in use' })
    } else {
        key = (Math.floor(1000 + Math.random() * 9000)) + '-' + req.body.email
        urlShortener.short('https://www.collegehub.co.zw/confirm-signup/' + key, function(err, shortURL) {
            const msg = {
                to: req.body.email,
                from: 'Collegehub Zimbabwe <hello@collegehub.co.zw>',
                subject: 'Collegehub Zimbabwe: Please confirm your email',
                html: '<html><head><meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Collegehub Zimbabwe</title> <style> @media only screen and (max-width: 620px) {table[class=body] h1 {font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a {font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article {padding: 10px !important; } table[class=body] .content {padding: 0 !important; } table[class=body] .container {padding: 0 !important; width: 100% !important; } table[class=body] .main {border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table {width: 100% !important; } table[class=body] .btn a {width: 100% !important; } table[class=body] .img-responsive {height: auto !important; max-width: 100% !important; width: auto !important; } } @media all {.ExternalClass {width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%; } .apple-link a {color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } .btn-primary table td:hover {background-color: #34495e !important; } .btn-primary a:hover {background-color: #34495e !important; border-color: #34495e !important; } } </style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Congratulations. Your account was successfully created.</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px; border: 1px solid #8B008B; border-radius: 2px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; text-align: justify;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <img src="https://www.collegehub.co.zw/logo.png" style="width: 15%; margin-top: 0px; margin-left: 10px; float: left;"/>&nbsp;<span style="font-weight: 350; font-size: 16px; color: #8B008B; text-shadow: 0.5px 0.5px 1px #333; float: left; margin-top: 15px; margin-left: 10px; padding-bottom: 50px; width: 76%;">COLLEGEHUB ZIMBABWE</span> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin-top: 20px; Margin-bottom: 15px; width: 90%;">Hello ' + req.body.firstname + ',</p> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Congratulations on creating your account on Collegehub. We are pleased to start an awesome journey with you. Before you proceed, you need to verify your account. Please click the button below to verify.</p> <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="' + shortURL + '" title="Collegehub" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Verify</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you are having trouble clicking the button above, simply follow the link below.<br>' + shortURL + '</p> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Best Regards</p> <img src="https://www.collegehub.co.zw/logo.png" style="height: 40px; margin-top: 0px; float: left;"/>&nbsp;<span style="font-weight: 350; font-size: 12px; color: #8B008B; text-shadow: 0.5px 0.5px 1px #333; float: left; margin-top: 15px; margin-left: 10px;">COLLEGEHUB ZIMBABWE TEAM</span> </td> </tr> </table> </td> </tr> </table> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Collegehub Private Limited Zimbabwe</span> <br> Don\'t like these emails? <a href="https://www.collegehub.co.zw/email/unsubscribe" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>. </td> </tr> <tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="https://www.lekkahub.com" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Lekkahub</a>. </td> </tr> </table> </div> </div> </td> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td> </tr> </table> </body> </html>'
            }
            const sms = {
                from: '+12055765938',
                body: 'Hello ' + req.body.firstname + '! Please verify your account on Collegehub by following: ' + shortURL,
                to: req.body.phone
            }

            sgMail.send(msg).then(
                message => console.log({
                    "date": new Date(),
                    "statusCode": message[0].statusCode,
                    "status": "Success",
                    "email": msg.to
                })).catch(
                error => console.log({
                    "date": new Date(),
                    "statusCode": error.statusCode,
                    "status": "Error",
                    "email": msg.to
                })
            )

            client.messages.create(sms).then(
                message => console.log({
                    "date": new Date(),
                    "messageSID": message.sid,
                    "status": "Success",
                    "sms": sms.to
                })).catch(
                error => console.log({
                    "date": new Date(),
                    "messageSID": error.statusCode,
                    "status": "Error",
                    "sms": sms.to
                })
            )
        })

        await users.insertOne({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isConfirmed: false,
            confirmationKey: key,
            profileImage: null,
            dob: null,
            phone: req.body.phone,
            sex: null,
            createdAt: new Date()
        })
        return res.status(201).json({ message: 'Your account has been created. A confirmation email has been sent to ' + req.body.email })
    }
})
router.post('/signupgoogle', async(req, res) => {
    const id_token = req.body.id_token;
    debugger
    console.log('token from front end', id_token);
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: id_token,
            audience: process.env.google_clientID, // Specify the CLIENT_ID of the app that accesses the backend

        });
        var user = null;
        const users = await loadUsers()
        const payload = ticket.getPayload();
        const email = payload['email'];
        // const username = payload['name'];
        if (user = await users.findOne({ email: email })) {
            req.session.authUser = { user: user }
            return res.json({ user })

        } else {

            user = await users.insertOne({
                firstname: payload['given_name'],
                lastname: payload['family_name'],
                username: email,
                email: email,
                isConfirmed: true,
                profileImage: payload['picture'],
                confirmationKey: null,
                dob: null,
                phone: null,
                sex: null,
                createdAt: new Date()
            });
            req.session.authUser = { user: user }
            console.log('authenticated..', req.session.authUser)
            return res.json({ user })
        }
    } catch (error) {

    }

})

//Email Confirmation
router.post('/confirm-signup/:id', async(req, res) => {
    const users = await loadUsers()
    var user = null
    if (user = await users.findOne({ "confirmationKey": req.params.id })) {
        if (user.isConfirmed == false) {
            await users.findOneAndUpdate({ "confirmationKey": req.params.id }, { $set: { "isConfirmed": true } }, { upsert: true, })

            const msg = {
                to: user.email,
                from: 'Collegehub <noreply@collegehub.co.zw>',
                subject: 'Collegehub: Your email account has been confirmed',
                html: '<h2>Hello, ' + user.firstname + '</h2><p>Your email has successfully been confirmed</p><p>Regards</p></p><p>Collegehub</p>',
            }
            sgMail.send(msg)
        }


        var user = await users.findOne({ "confirmationKey": req.params.id })
        if (user.isConfirmed) {
            req.session.authUser = { user: user }
            return res.json({ user })
        } else {
            res.status(400).json({ message: 'Does not exist!' })
        }
    } else {
        res.status(400).json({ message: 'Does not exist!' })
    }
})

//Login User
router.post('/login', async(req, res) => {
    const users = await loadUsers()
    var user = null;
    if (user = await users.findOne({ "email": req.body.email, "password": req.body.password })) {
        req.session.authUser = { user: user }
        return res.json({ user })
    }
    res.status(401).json({ message: 'Incorrect login credentials' })
})

//Forgot Password
router.post('/forgot-password', async(req, res) => {
    const users = await loadUsers()
    var key = null;
    var user = '';
    if (user = await users.findOne({ "email": req.body.email })) {
        key = (Math.floor(1000 + Math.random() * 9000)) + '-' + req.body.email
        await users.findOneAndUpdate({ "email": req.body.email }, { $set: { "password-reset-status": true, "password-reset-code": key } }, { upsert: true, })
        const msg = {
            to: user.email,
            from: 'Collegehub <noreply@collegehub.co.zw>',
            subject: 'Collegehub: Reset Your Password',
            html: '<h2>Hi, ' + user.firstname + '</h2><p>It seems you forgot your password. Please <a href="' + url + '/reset-password/' + key + '" title="Collegehub">clicking this link</a> to reset your password.</p><p>Regards</p>',
        }
        sgMail.send(msg)
        return res.status(201).json({ message: 'A Reset Passwoord email has been sent to your email' })
    } else {
        res.status(400).json({ message: 'Email does not exist!' })
    }
})

//Reset Password
router.post('/reset-password/:id', async(req, res) => {
    const users = await loadUsers()
    var user = '';
    if (user = await users.findOne({ "password-reset-code": req.params.id })) {
        await users.findOneAndUpdate({ "password-reset-code": req.params.id }, { $set: { "password-reset-status": false, "password": req.body.password } }, { upsert: true, })
        const msg = {
            to: user.email,
            from: 'Collegehub <noreply@collegehub.co.zw>',
            subject: 'Collegehub: Reset Your Password',
            html: '<h2>Hi, ' + user.firstname + '</h2><p>Your password has been reset. Your new password is: <strong>' + req.body.password + '</strong>.<br>Go to <a href="' + url + '" title="Collegehub">Collegehub</a> and login.</p><p>Regards</p>',
        }
        sgMail.send(msg)
        return res.status(201).json({ message: 'Password successfully reset!' })
    } else {
        res.status(401).json({ message: 'Email does not exist!' })
    }
})

//Logout User
router.post('/logout', (req, res) => {
    delete req.session.authUser
    res.json({ ok: true })
})

//Get All Users
router.post('/allusers', async(req, res) => {
    const users = await loadUsers()
    return res.send(await users.find({}).toArray())
})

//Delete User
router.delete('/delete/:id', async(req, res) => {
    const users = await loadUsers()
    await users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(201).json({
        message: req.params.id + ' has been deleted'
    })
})

//Get a user by username
router.post('/profile/:id', async(req, res) => {
    const users = await loadUsers()
    var user = null
    if (user = await users.findOne({ "username": req.params.id, "isConfirmed": true })) {
        return res.json({ user })
    } else {
        return res.status(401).json({ message: 'User Not Found or has not yet confirmed' })
    }
})

//Get a user by ID
router.post('/user/:id', async(req, res) => {
    const users = await loadUsers()
    var user = null
    if (user = await users.findOne({ _id: new mongodb.ObjectID(req.params.id), isConfirmed: true })) {
        return res.json({ user })
    } else {
        return res.status(401).json({ message: 'User Not Found or has not yet confirmed' })
    }
})

//Edit profile
router.post('/profile/edit/:id', async(req, res) => {
    const users = await loadUsers()
    if (await users.findOne({ "username": req.params.id, "isConfirmed": true })) {
        let params = { updatedAt: new Date() }
        await users.findOneAndUpdate({ "username": req.params.id }, { $set: Object.assign(params, req.body) }, { upsert: true, })
        var user = null
        if (user = await users.findOne({ "username": req.params.id, "isConfirmed": true })) {
            return res.json({ user })
        }
    } else {
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
        metadata: function(req, file, cb) {
            cb(null, { fieldName: 'Profile Image' });
        },
        key: function(req, file, cb) {
            cb(null, 'profileImages/' + Date.now().toString() + file.originalname)
        }
    })
})

router.post('/profile/upload/image/:id', upload.single('profileImage'), async(req, res, next) => {
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
            "path": "/img/" + req.file.key,
            "absoluteExternalPath": "https://s3.amazonaws.com/collegehub/" + req.file.key
        }
    }
    await users.findOneAndUpdate({ "username": req.params.id }, { $set: Object.assign(params) }, { upsert: true, })
    user = await users.findOne({ "username": req.params.id })
    return res.json({ user })
})

//Change Username
router.post('/profile/edit/username/:id', async(req, res) => {
    const users = await loadUsers()
    if (await users.findOne({ "email": req.params.id, "isConfirmed": true })) {
        let params = { updatedAt: new Date() }
        await users.findOneAndUpdate({ "email": req.params.id }, { $set: Object.assign(params, req.body) }, { upsert: true, })
        var user = null
        if (user = await users.findOne({ "email": req.params.id, "isConfirmed": true })) {
            const msg = {
                to: req.params.id,

                from: 'Collegehub <noreply@collegehub.co.zw>',
                subject: 'Collegehub: Your Username has successfully been changed',
                html: '<h2>Hi, ' + user.firstname + '</h2><p>Your username has successfully been changed to ' + user.username + '. Please follow <a href="' + url + '/profile/' + user.username + '" title="Profile">this link</a> to check out your profile</p><p>Regards</p>',
            }
            sgMail.send(msg)
            return res.json({ user })
        }
    } else {
        res.status(401).json({
            message: 'User Not Found or has not yet confirmed'
        })
    }
})


//Request to rent
//http://localhost:8080/users/accommodation/request/5ccdf629ba8063019c0e7d07
router.post('/accommodation/request/:id', async(req, res) => {
    const users = await loadUsers()
    var user
    if (user = await users.findOne({ _id: new mongodb.ObjectID(req.params.id) })) {
        let newRequest = {
            requestID: req.body.reqID,
            requester: req.body.requesterID,
            requestedHouseID: req.body.houseID,
            requestStatus: 'pending',
            requestedDate: new Date(),
            statusDateUpdate: null
        }

        if (user.isConfirmed == true) {
            var temp = []
            if (user.hasOwnProperty('allRequests')) {
                temp = user.allRequests
            }
            var requested = false,
                index
            for (index in temp) {
                if (temp[index].requestedHouseID == newRequest.requestedHouseID) {
                    requested = true
                }
            }
            temp.push(newRequest)
            let params = { allRequests: temp }

            if (requested == false) {
                await users.findOneAndUpdate({ _id: new mongodb.ObjectID(req.params.id) }, { $set: Object.assign(params) }, { upsert: true })
            }
            user = await users.findOne({ _id: new mongodb.ObjectID(req.params.id) })
            return res.json({ user })
        } else {
            return res.status(401).json({ message: 'Cannot Request to Rent. Account has not been confirmed yet' })
        }
    } else {
        return res.status(401).json({ message: 'User has not yet confirmed account' })
    }
})

router.post('/accommodation/cancel/request/:id', async(req, res) => {
    const users = await loadUsers()
    var user
    if (user = await users.findOne({ _id: new mongodb.ObjectID(req.params.id) })) {
        if (user.isConfirmed == true) {
            var temp = []
            if (user.hasOwnProperty('allRequests')) {
                temp = user.allRequests
            }
            var index
            for (index in temp) {
                if (temp[index].requester == req.body.requester) {
                    temp.splice(index, 1)
                }
            }
            let newRequest = {
                requestID: req.body.requestID,
                requester: req.body.requester,
                requestedHouseID: req.body.requestedHouseID,
                requestStatus: req.body.requestStatus,
                requestedDate: req.body.requestedDate,
                statusDateUpdate: new Date()
            }
            temp.push(newRequest)
            let params = { allRequests: temp }

            await users.findOneAndUpdate({ _id: new mongodb.ObjectID(req.params.id) }, { $set: Object.assign(params) }, { upsert: true })

            user = await users.findOne({ _id: new mongodb.ObjectID(req.params.id) })
            return res.json({ user })
        } else {
            return res.status(401).json({ message: 'Cannot Request to Rent. Account has not been confirmed yet' })
        }
    } else {
        return res.status(401).json({ message: 'User has not yet confirmed account' })
    }
})



export default {
    path: '/users',
    handler: router
}