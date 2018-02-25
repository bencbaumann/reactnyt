const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
const http = require('http')
const socketIo = require('socket.io')
const PORT = process.env.PORT || 3001

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Serve up static assets
app.use(express.static('client/build'))
// Add routes, both API and view
app.use(routes)

// Set up promises with mongoose
mongoose.Promise = global.Promise
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/nytreact',
  {
    useMongoClient: true
  }
)

const server = http.Server(app)

// Start the API server
server.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

const io = socketIo(server)

io.on('connection', socket => {
  socket.emit('hello', {
    greeting: 'Hello Ben'
  })
})
