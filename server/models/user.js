/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, 'username must be at least 3 characters long'],
    required: [true, 'username is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: mongoose.Schema.Types.String,
  refreshToken: mongoose.Schema.Types.String,
  updatedAt: mongoose.Schema.Types.String,
})

// Format the returned document
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
