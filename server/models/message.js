/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed,
    minLength: [1, 'message content must be at least 1 character long'],
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  timestamp: {
    type: Date,
    required: true,
  },
})

// Format the returned document
messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
