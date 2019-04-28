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
const loadLocale = async function () {
  try{
  const client = await mongodb.MongoClient.connect(process.env.database, {useNewUrlParser: true})
  return client.db('collegehub').collection('locale')
  }catch(e){
    console.log(e);
  }
}

//Add a Data
router.post('/add/locale', async (req, res) => {
	const locale = await loadLocale()
	var data = null
	data = await locale.insertOne(req.body, function (err, result){
		if(err)
      return res.status(401).json({message: 'Error Adding house'})
    else
      return res.json({data})
	})
})

//Get All Locales
router.post('/get/locales', async (req, res) => {
  const locale = await loadLocale()
  return res.send(await locale.find({}).toArray())
})

//Delete Locale by ID
router.delete('/delete/locale/:id', async (req, res) => {
  const locale = await loadLocale()
  if(await locale.deleteOne({_id: new mongodb.ObjectID(req.params.id)})){
    return res.status(201).json({message: 'Successfully Deleted'})
  }else{
    return res.status(401).json({message: 'Locale could not be found'})
  }
})



export default {
  path: '/data',
  handler: router
}
