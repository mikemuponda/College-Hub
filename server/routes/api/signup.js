const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()
const loadUsers = async function() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://lekka:lekka123@ds046377.mlab.com:46377/collegehub',
    {
      useNewUrlParser: true
    }
  )
  return client.db('collegehub').collection('users')
}

router.get('/', async (req, res) => {
  const users = await loadUsers()
  res.send(await users.find({}).toArray())
})

router.post('/', async (req, res) => {
  const users = await loadUsers()
  await users.insertOne({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    houses_owned: req.body.houses_owned,
    house_id: req.body.house_id,
    house_no: req.body.house_no,
    street: req.body.street,
    surbub: req.body.surbub,
    requests_made: req.body.requests_made,
    createdAt: new Date()
  })
  res.status(201).send()
})

module.exports = router
