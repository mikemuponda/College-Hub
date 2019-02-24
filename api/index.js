import express from 'express'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const router = express.Router()
const app = express()

mongoose.connect('mongodb://lekka:lekka123@ds046377.mlab.com:46377/collegehub', { useNewUrlParser: true })
var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log("Connected to Mongodb")
  });


router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = {
      username: 'demo'
    }
    return res.json({
      username: 'demo'
    })
  }
  res.status(401).json({
    message: 'Incorrect login credentials'
  })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({
    ok: true
  })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
