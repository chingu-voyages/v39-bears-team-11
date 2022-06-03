const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')

// Require routers here
const messageRouter = require('./routes/messageRouter')
const userRouter = require('./routes/userRouter')
const loginRouter = require('./routes/loginRouter')
const tokenRouter = require('./routes/tokenRouter')
const peopleRouter = require('./routes/peopleRouter')

// Import middlewares
const { MONGODB_URI } = require('./utils/config')
const { infoLogger, errorLogger } = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

/* Database Connection */
infoLogger('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    infoLogger('connected to database')
  })
  .catch((error) => {
    errorLogger('error connecting to database:', error.message)
  })

// Use app to point express to the client build which is in the root folder
app.use(express.static('../build'))

/* Use app middleware in this order */
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// use routers here //
app.use('/message', messageRouter)
app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use('/token', tokenRouter)
app.use('/people', peopleRouter)

/* These two middleware must be used last */
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
