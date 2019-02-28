import express from 'express'
const router = express.Router()
const app = express()



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
