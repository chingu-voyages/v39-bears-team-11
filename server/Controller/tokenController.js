const jwt = require('jsonwebtoken')
const User = require('../models/user')

const postTokenController = async (req, res) => {
  const refreshToken = req.body.refreshToken

  /* use the stored secret to validate the token */
  const decodedRefreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  )

  if (!decodedRefreshToken.id) {
    return response.status(401).json({
      error: 'Refresh token missing or invalid'
    })
  }

  /* Check the db for an id that corresponds the id in the refresh token */
  const user = await User.findById(decodedRefreshToken.id)
  /* Also make sure that the refresh token is an exact match to        */
  /* minimize security risks, since tokens are replaced on every login */
  if ((!user) || (user.refreshToken !== refreshToken)) {
    return res.status(401).json({
      error: 'Access Denied!'
    })
  }

  const userForToken = {
    id: user.id,
    username: user.username,
    email: user.email,
  }
  
  /* Access token is created by encrypting three user fields:    */
  /* - id, username, email - and a secret. Expires in 15 minutes */
  const token = jwt.sign(
    userForToken,
    process.env.TOKEN_SECRET,
    { expiresIn: 60 * 15 }
  )

  res.status(200).send(token)
}

/* Controller to delete user's refresh token on logout */
const deleteTokenController = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).end()
  }

  user.refreshToken = ''
  await user.save()
  res.status(200)
}

module.exports = {
  postTokenController,
  deleteTokenController,
}