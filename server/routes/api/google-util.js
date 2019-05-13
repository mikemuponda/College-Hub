const express = require('express')
require('dotenv').config()
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const mongodb = require('mongodb')
const router = express.Router()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/google/signup', async (req, res) => {
	res.status(200).json({
		message: 'OK'
	})
})

export default {
  path: '/apis',
  handler: router
}