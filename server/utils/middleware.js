const { infoLogger, errorLogger } = require('./logger')

/* A middleware that logs information of each request */
/* received by the server. Mainly, the request        */
/* method, route, and body, if provided.              */

const requestLogger = (request, _, next) => {
  infoLogger('---')
  infoLogger('Method:', request.method)
  infoLogger('Path:  ', request.path)
  infoLogger('Body:  ', request.body)
  infoLogger('---')
  next()
}

/* A middleware that intercepts all     */
/* requests that are not defined in our */
/* app and returns a 404 response code  */

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

/* A middleware that handles errors thrown,     */
/* by routers, and returns approprite responses */
/* If the thrown error is not defined here,     */
/* it is passed to the next middleware through  */
/* the next() call.                             */

// eslint-disable-next-line consistent-return
const errorHandler = (error, _, response, next) => {
  errorLogger(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({
      error: 'malformatted id',
    })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    })
  }
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]
    const value = Object.values(error.keyValue)[0]

    return response.status(409).json({
      error: `${field}: ${value} already exists`,
    })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
