const bcrypt = require('bcrypt')
const User = require('../models/user')
const { generateAllTokens } = require('../utils/helper')

const loginController = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })

  /* If user was not found or password is incorrect     */
  /* passwordCorrect is equal to false, otherwise, true */
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid user credentials'
    })
  }
  
  const { token, refreshToken } = generateAllTokens(user)

  /* Update token and refresh token in user document */
  const userToUpdate = {
    refreshToken,
  }
  
  /* findByIdAndUpdate here takes three arguments the user id, an object with the fields */
  /* to update, and an options object. if the `new `field is true, return the modified   */
  /* document rather than the original.                                                  */

  /* The populate method is then called on the query object created by findByIdAndUpdate */
  /* It is used to fetch data from other documents or collections to fill the fields we  */
  /* need from our reference field: contacts. populate takes two arguments: the field to */
  /* populate - contacts - and an object representing the data that must be returned.    */
  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    {
      ...userToUpdate,
      updatedAt: new Date().toISOString(),
    },
    { new: true },
  ).populate('contacts', {
    username: 1,
    picture: 1,
  })

  res.status(200).json({
    id: updatedUser.id,
    username: updatedUser.username,
    email: updatedUser.email,
    contacts: updatedUser.contacts,
    refreshToken: updatedUser.refreshToken,
    token: token,
  })
}

module.exports = {
  loginController,
}