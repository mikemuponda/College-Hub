const express = require('express')
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const multer = require('multer');
const fs = require('fs')
const path = require('path')
const router = express.Router()
const app = express()

const sendGridKey = process.env.sendGridKey
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
  const client = await mongodb.MongoClient.connect(process.env.database, {useNewUrlParser: true})
  return client.db('collegehub').collection('houses')
}

//Add a house
router.post('/list/house', async (req, res) => {
	const houses = await loadHouses()
	var house = null
	house = await houses.insertOne(req.body, function (err, result){
		if(err)
      return res.status(401).json({message: 'Error Adding house'})
		else
      if(req.xhr)
        return res.json({house})
      else
        return res.status(403).json({message: 'Not Authorised'})
	})
})

//Edit a house
router.post('/house/edit/:id', async (req, res) => {
	const houses = await loadHouses()
	var house = null
  let params = { updatedAt: new Date() }
  if(await houses.findOneAndUpdate({"_id": new mongodb.ObjectID(req.params.id)}, {$set: Object.assign(params, req.body)}, {upsert: true,})){
    house = await houses.findOne({ "_id": new mongodb.ObjectID(req.params.id)})
    return res.json({house})
  }else{
    return res.status(401).json({message: 'House could not be found'})
  }
})

//Get All Houses
router.post('/allhouses', async (req, res) => {
  const houses = await loadHouses()
  if(req.xhr)
    return res.send(await houses.find({}).toArray())
  else
    return res.status(403).json({message: 'Not Authorised'})
})

//Get one house by id
router.post('/house/:id', async (req, res) => {
  const houses = await loadHouses()
  var house = null
  if (house = await houses.findOne({ _id: new mongodb.ObjectID(req.params.id)})) {
    if(req.xhr)
      return res.send({house})
    else
      return res.status(403).json({message: 'Not Authorised'})
  }else{
		return res.status(401).json({message: 'House could not be found'})
	}
})

//Get houses by owner
router.post('/owner/:id', async (req, res) => {
  const houses = await loadHouses()
  var housesOwnned = null
  if(housesOwnned = await houses.find({owner: req.params.id}).toArray())
    if(!housesOwnned.length)
      res.status(201).json({message: 'House could not be found'})
    else
      res.send(housesOwnned)
  else
    res.status(401).json({message: 'House could not be found'})
})

//Delete House by ID
router.delete('/delete/:id', async (req, res) => {
  const houses = await loadHouses()
  if(await houses.deleteOne({_id: new mongodb.ObjectID(req.params.id)})){
    return res.status(201).json({message: 'Successfully Deleted'})
  }else{
    return res.status(401).json({message: 'House could not be found'})
  }
})

export default {
  path: '/houses',
  handler: router
}
