const express = require('express')
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const router = express.Router()
const app = express()

const sendGridKey = ''
sgMail.setApiKey(sendGridKey)

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

//Load Users From MongoDB
const loadContactInfo = async function () {
  const client = await mongodb.MongoClient.connect('mongodb://lekka:lekka123@ds046377.mlab.com:46377/collegehub', {useNewUrlParser: true})
  return client.db('collegehub').collection('contactMessages')
}

//Send Message
router.post('/message/send', async (req, res) => {
	const contactMessage = await loadContactInfo()
	var message = null
	message = await contactMessage.insertOne(req.body, function (err, result){
		const msg = {
      to: "tinashe@lekkahub.com",
      cc: req.body.email,
      from: req.body.name + ' <' + req.body.email + '>',
      subject: 'Message from ' + req.body.name,
      html: '<p>Name: ' + req.body.name + '</p><p>Phone: ' + req.body.phone + '</p><p>' + req.body.message + '</p>',
    }
    sgMail.send(msg)
		if(err)
			res.status(401).json({message: 'Error Adding message'})
		else
			res.status(201).json({message})
	})
})

//Get All Messages
router.get('/allmessages', async (req, res) => {
  const contactMessage = await loadContactInfo()
  res.send(await contactMessage.find({}).toArray())
})

//Get one message
router.post('/message/:id', async (req, res) => {
  const contactMessage = await loadContactInfo()
  var message = null
  if (message = await contactMessage.findOne({ _id: new mongodb.ObjectID(req.params.id)})) {
    return res.json({message})
  }else{
		res.status(401).json({message: 'message could not be found'})
	}
})

//Delete message
router.delete('/message/delete/:id', async (req, res) => {
  const contactMessage = await loadContactInfo()
  if(await contactMessage.deleteOne({_id: new mongodb.ObjectID(req.params.id)}))
		res.status(201).json({message: req.params.id + ' has been deleted'})
	else
		res.status(401).json({message: req.params.id + ' could not be found'})
})


export default {
  path: '/contact',
  handler: router
}