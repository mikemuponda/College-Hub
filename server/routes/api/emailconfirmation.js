const express = require('express')
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const router = express.Router()
const app = express()

const sendGridKey = ''
sgMail.setApiKey(sendGridKey);


const loadUsers = async function () {
  const client = await mongodb.MongoClient.connect(
    'mongodb://lekka:lekka123@ds046377.mlab.com:46377/collegehub', {
      useNewUrlParser: true
    }
  )
  return client.db('collegehub').collection('users')
}

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/:id', async (req, res) => {
  key = req.params.id
  const users = await loadUsers()
  if (await users.findOne({ "confirmationKey": key })){
    await users.findOneAndUpdate({ "confirmationKey": key }, { $set: { "isConfirmed" : true }}, { upsert:true, }) 
    const msg = {
			to: req.body.email,
			cc: "tinashe@lekkahub.com",
      from: 'Collegehub <noreply@collegehub.co.zw>',
      subject: 'Collegehub: Your email account has been confirmed',
      html: '<h2>Hi, ' + req.body.first_name + '</h2><p>Your email has successfully been confirmed</p><p>Regards</p></p><p>Collegehub</p>',
    }
    //sgMail.send(msg)
    user = await users.findOne({ "confirmationKey": key })
    if(user.isConfirmed)
      res.send(user)
    else{
      res.status(400).json({
        message: 'Does not exist!'
      })
    }
  } else {
    res.status(400).json({
      message: 'Does not exist!'
    })
  }
})


module.exports = router
