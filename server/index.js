
const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8080


app.set('port', port)
app.use(bodyParser.json())
app.use(cors())



// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = app.listen(port, host)
  const io = require('socket.io')(server);
  var activity = []

  //io.on('connection', function(socket) { socket.on('SEND_MESSAGE', function(data) { io.emit('MESSAGE', data)});})
  io.on('connection', function(socket) {
    socket.on('ACTIVITY_FEED', function(data) {
      activity.push(data)
      var i = 0
      var counter = 0
      var emitted = false
      var firstIndex = null
      for(i = 0; i < activity.length; i++){
        if(activity[i].user.username == data.user.username){
          activity[i].user.profileImage = data.user.profileImage
          if(counter == 0){
            firstIndex = i
          }
          ++counter
          if(counter > 1){
            activity[firstIndex].activity.ringer = false
            activity.splice(i)
            counter--
          }
        }
      }
      if(counter > 1)
        activity.pop()

      if(emitted == false)
        io.emit('ACTIVITY', activity)
    }),

    socket.on('ACTIVITY_FEED_LOGOUT', function(data) {
      var i = 0
      for(i = 0; i < activity.length; i++){
        if(activity[i].user.username == data.user.username){
          activity.splice(i)
        }
      }
      io.emit('ACTIVITY', activity)
    })
  })
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
