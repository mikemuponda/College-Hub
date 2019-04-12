const express = require('express')
const router = express.Router()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/', function (req, res, next) {
	res.json({status: 'UP'});
})

export default {
  path: '/health',
  handler: router
}
