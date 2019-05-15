const express = require('express')
require('dotenv').config()
const router = express.Router()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/test', async (req, res) => {
	res.status(200).json({
		message: 'OK'
	})
})

export default {
  path: '/auth',
  handler: router
}