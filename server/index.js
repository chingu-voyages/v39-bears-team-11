const http = require('http')
const app = require('./app')
const { infoLogger } = require('./utils/logger')
const { PORT } = require('./utils/config')

const server = http.createServer(app)

server.listen(PORT, () => {
  infoLogger(`Server running on port ${PORT}`)
})
