// helper function to create error object
const errorConfig = (
  type = 'ValidationError',
  statusText = 'Something went wrong!',
  statusCode = 404,
) => {
  const error = new Error({
    name: type,
    message: statusText,
    code: statusCode,
  })

  return error
}

module.exports = errorConfig
