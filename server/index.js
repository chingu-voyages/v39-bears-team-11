const http = require('http')
const app = require('./app')
require('dotenv').config()
const { infoLogger } = require('./utils/logger')
const { PORT } = require('./utils/config')
const SetSocketServer = require('./socket/index')

const server = http.createServer(app)

/* Create a socket.io instance */
const io = require('socket.io')(server, {
  /* Limit message size to 2MB */
  maxHttpBufferSize: 2e6,
  /* The cors field is only necessary in dev mode since the entire app will have one   */
  /* url, and requests coming from frontend share the same origin as the socket server */
  cors: {
    origin: process.env.CLIENT_APP_URL,
  },
})

/* Initialize the socket server */
SetSocketServer(io)

server.listen(PORT, () => {
  infoLogger(`Server running on port ${PORT}`)
})
