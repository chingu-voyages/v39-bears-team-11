const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUsersController = async (_, res) => {
  const users = await User
    .find({})
    .populate('contacts', { username: 1 })

  res.json(users)
}

const postUserController = async (req, res) => {
  const { username, email, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create token and refresh token
  

  const user = new User({
    username,
    email,
    passwordHash,
    contacts: [],
    picture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    token,
    refreshToken,
  })

  await user.save()
  res.status(201)
}

module.exports={
  getUsersController,
  postUserController,
}