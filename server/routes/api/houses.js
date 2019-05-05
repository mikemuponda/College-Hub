const express = require('express')
const mongodb = require('mongodb')
const sgMail = require('@sendgrid/mail')
const bodyParser = require("body-parser")
const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const router = express.Router()
const app = express()

aws.config.update({
  secretAccessKey: process.env.awsSecretAccessKey,
  accessKeyId: process.env.awsAccessKeyId,
  region: process.env.awsRegion
})

const s3 = new aws.S3()

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
  try{
  const client = await mongodb.MongoClient.connect(process.env.database, {useNewUrlParser: true})
  return client.db('collegehub').collection('houses')
  } catch (e){
    console.log(e);
  }
}

//Add a house
router.post('/list/house', async (req, res) => {
	const houses = await loadHouses()
	await houses.insertOne(req.body, function (err, response){
		if(err)
      return res.status(401).json({message: 'Error Adding house'})
		else{
      return res.json(response.ops)
    }   
	})
})



//Image Upload

 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'collegehub',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, 'AccomodationImages/' + Date.now().toString() + file.originalname)
    }
  })
})

router.post('/list/house/upload/:id', upload.any(), async (req, res, next) => {
  const houses = await loadHouses()
  var house = null
  var accommodationImages = []
  var i = 0
  for(i = 0; i < req.files.length; i++){
    accommodationImages.push({
        "fieldname": req.files[i].fieldname,
        "originalname": req.files[i].originalname,
        "encoding": req.files[i].encoding,
        "mimetype": req.files[i].mimetype,
        "size": req.files[i].size,
        "bucket": req.files[i].bucket,
        "key": req.files[i].key,
        "acl": req.files[i].acl,
        "contentType": req.files[i].contentType,
        "contentDisposition": req.files[i].contentDisposition,
        "storageClass": req.files[i].storageClass,
        "serverSideEncryption": req.files[i].serverSideEncryption,
        "location": req.files[i].location,
        "etag": req.files[i].etag,
        "path": "https://s3.amazonaws.com/collegehub/" + req.files[i].key
    })
  }
  let params = {accommodationImages}
  await houses.findOneAndUpdate(
    {"_id": new mongodb.ObjectID(req.params.id)},
    {$set: Object.assign(params)},
    {upsert: true,}
  )
  house = await houses.findOne({ "_id": new mongodb.ObjectID(req.params.id)})
  return res.json({house})

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
  return res.send(await houses.find({}).toArray())
})

//Get one house by id
router.post('/house/:id', async (req, res) => {
  const houses = await loadHouses()
  var house = null
  if (house = await houses.findOne({ _id: new mongodb.ObjectID(req.params.id)})) {
    return res.send({house})
  }else{
		return res.status(401).json({message: 'House could not be found'})
	}
})

//Get one house by city
router.post('/city/:id', async (req, res) => {
  const houses = await loadHouses()
  return res.send(await houses.find({ city: req.params.id}).toArray())
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

//Request to rent
//http://localhost:8080/houses/house/request/5cc9154cd3b7ae093481b099
router.post('/house/request/:id', async (req, res) => {
  const houses = await loadHouses()
  var house = await houses.findOne({ _id: new mongodb.ObjectID(req.params.id)})
  let newRequest = {
    requestID: req.body.reqID,
    requester: req.body.requesterID,
    requestedHouseID: req.body.houseID,
    requestStatus: 'pending',
    requestedDate: new Date(),
    statusDateUpdate: null 
  }
  var temp = []
  if(house.hasOwnProperty('allRequests')){
    temp = house.allRequests
  }
  var requested = false, index
  for(index in temp){
    if(temp[index].requester == newRequest.requester){
      requested = true
    }
  }
  temp.push(newRequest)
  let params = { allRequests: temp}
  if(requested == false){
    await houses.findOneAndUpdate(
      {_id: new mongodb.ObjectID(req.params.id)},
      {$set: Object.assign(params)},
      {upsert: true}
    )
  }
  house = await houses.findOne({_id: new mongodb.ObjectID(req.params.id)})
  return res.json({house})
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
