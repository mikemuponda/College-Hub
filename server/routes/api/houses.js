const express = require('express')
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const multer = require('multer');
const fs = require('fs')
const path = require('path')
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

//Load Houses From MongoDB
const loadHouses = async function () {
  const client = await mongodb.MongoClient.connect('mongodb://lekka:lekka123@ds046377.mlab.com:46377/collegehub', {useNewUrlParser: true})
  return client.db('collegehub').collection('houses')
}

//Add a house
router.post('/list/house', async (req, res) => {
	const houses = await loadHouses()
	var house = null
	house = await houses.insertOne(req.body, function (err, result){
		if(err)
			res.status(401).json({message: 'Error Adding house'})
		else
			res.status(201).json({house})
	})
})

//Get All Houses
router.get('/allhouses', async (req, res) => {
  const houses = await loadHouses()
  res.send(await houses.find({}).toArray())
})

//Get one house
router.post('/house/:id', async (req, res) => {
  const houses = await loadHouses()
  var house = null
  if (house = await houses.findOne({ _id: new mongodb.ObjectID(req.params.id)})) {
    return res.json({house})
  }else{
		res.status(401).json({message: 'House could not be found'})
	}
})

//Delete House
router.delete('/delete/:id', async (req, res) => {
  const houses = await loadHouses()
  await houses.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(201).json({
    message: req.params.id + ' has been deleted'
  })
})

export default {
  path: '/houses',
  handler: router
}
