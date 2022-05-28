// import the models
const Message = require('../models/message')
const User = require('../models/user')

// import helper function
const errorConfig = require('../utils/helper')

// controller to fetch user messages
const getMessageController = async (req, res, next) => {
  // get the user id from the request body
  const { user_id: id } = req.params

  // if there is no user id in the request,
  // throw client error
  if (!id) {
    const error = errorConfig(
      'ValidationError',
      'User id field is required',
      400,
    )
    next(error)
  }

  // if there is an id, then
  try {
    // query the database for every messages where user is sender or receiver
    const userMessages = await Message.find().or([
      { sender: id },
      { receiver: id },
    ])
    // get user friends
    const userFriends = await User.findById(id).contacts
    // map the userFriends array into objects with friend_id and messages for each friend
    const userChats = userFriends.map((friend) => {
      const chats = userMessages.filter(
        (message) => message.sender === friend || message.receiver === friend,
      )
      return { friend_id: friend, messages: chats }
    })
    // if there is a match, send 200 status with result
    res.status(200).send(userChats)
  } catch (error) {
    // if there is an error, pass it to the error middleware
    next(error)
  }
}

// controller to send user messages
const postMessageController = async (req, res, next) => {
  // get the request payload
  // eslint-disable-next-line object-curly-newline
  const { userId, friendId, timestamp } = req.body
  
  // content is either a string or an image file
  const content = req.body.content || {
    data: new Buffer.from(req.file.buffer, 'base64'),
    contentType: req.file.mimetype
  }

  // check if there is no message,
  // and if so pass control to the error handling middleware
  if (![userId, friendId, content, timestamp].every(Boolean)) {
    const error = errorConfig(
      'ValidationError',
      'Require userId, friendId, content and timestamp to not be null or undefined',
      400,
    )
    next(error)
  }

  // if there is a message in the request, then
  try {
    // create messageSchema object
    const message = {
      content,
      receiver: friendId,
      sender: userId,
      timestamp,
    }
    // create a new message based on messageSchema
    const newMessage = new Message(message)
    // save the message in the database
    const result = await newMessage.save()
    // send a resource created response together with the new message
    res.status(201).send(result)
  } catch (error) {
    // if the operation is unsuccessful,
    // pass the error to the error middlware
    next(error)
  }
}

module.exports = {
  getMessageController,
  postMessageController,
}
