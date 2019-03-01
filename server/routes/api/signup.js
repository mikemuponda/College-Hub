const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const app = express()
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

router.get('/', async (req, res) => {
  const users = await loadUsers()
  res.send(await users.find({}).toArray())
})

router.delete('/:id', async (req, res) => {
  const users = await loadUsers()
  await users.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(201).json({
    message: req.params.id + ' has been deleted'
  })
})

router.post('/', async (req, res) => {
  const users = await loadUsers()
  if (await users.findOne({email: req.body.email})) {
    res.status(401).json({
      message: 'Email is already in use'
    })
  } else if(await users.findOne({username: req.body.username})){
    res.status(409).json({
      message: 'Username is already in use'
    })
  } else {
    await users.insertOne({
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isSeeker: req.body.isSeeker,
      isConfirmed: false,
      location: req.body.location,
      houses_owned: req.body.houses_owned,
      house_id: req.body.house_id,
      house_no: req.body.house_no,
      street: req.body.street,
      surbub: req.body.surbub,
      requests_made: req.body.requests_made,
      createdAt: new Date()
    })
    res.status(201).json({
      message: 'Your account has been created. A confirmation email has been sent to ' + req.body.email
    })
  }
})

module.exports = router
