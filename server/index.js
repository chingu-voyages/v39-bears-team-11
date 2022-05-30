const http = require('http')
const app = require('./app')
require('dotenv').config()
const { infoLogger } = require('./utils/logger')
const { PORT } = require('./utils/config')
const SetSocketServer = require('./socket/index')

const server = http.createServer(app)

/* Create a socket.io instance */
const io = require('socket.io')(server, {
  maxHttpBufferSize: 2e6,
  cors: {
    origin: process.env.CLIENT_APP_URL,
  },
})

/* Initialize the socket server */
SetSocketServer(io)

server.listen(PORT, () => {
  infoLogger(`Server running on port ${PORT}`)
})
