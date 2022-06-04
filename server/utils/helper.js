const jwt = require('jsonwebtoken')

// helper function to create error object
const errorConfig = (
  type = 'ValidationError',
  statusText = 'Something went wrong!',
  statusCode = 400,
) => {
  const error = new Error({
    name: type,
    message: statusText,
    code: statusCode,
  })

  return error
}

const generateAllTokens = (user) => {
  /* Tokens are created by encrypting three user */
  /* fields - username, email, id - and a secret */
  const userForToken = {
    id: user.id,
    username: user.username,
    email: user.email,
  }

  /* Access token expires every 15 minutes while */
  /* the refresh token has no expiration date.   */
  const token = jwt.sign(
    userForToken,
    process.env.TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    userForToken,
    process.env.REFRESH_TOKEN_SECRET,
  )

  return {
    token,
    refreshToken,
  }
}

/* Parse authorization header to extract token */
const getTokenFromHeader =  (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

module.exports = {
  errorConfig,
  generateAllTokens,
  getTokenFromHeader,
}

