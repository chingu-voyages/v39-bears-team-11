const logger = require('./logger')

const requestLogger = (request, _, next) => {
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({
      error: 'malformatted id'
    })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }
  else if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]
    const value = Object.values(error.keyValue)[0]

    return response.status(409).json({
      error: `${ field }: ${ value } already exists`
    })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  else if  (error.name === 'InternalServerError') {
    return response.status(500).json({
      error: 'Internal Server Error'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
