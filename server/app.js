const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')

// Require routers here //

const { MONGODB_URI } = require('./utils/config')
const { infoLogger, errorLogger } = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

/* Database Connection */
logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
  .then(() => {
    infoLogger('connected to database')
  })
  .catch((error) => {
    errorLogger('error connecting to database:', error.message)
  })


/* Use app middleware in this order*/
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

//use routers here //

/* These two middleware must be used last */
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
