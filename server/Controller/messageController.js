// import the models
const Message = require('../models/message')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { getTokenFromHeader } = require('../utils/helper')

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
  
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).end()
  }
  
  const token = getTokenFromHeader(req)
  /* use the stored secret to validate the token */
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  /* If the id from the decoded token and the id from  */
  /* the user document do not match, return auth error */
  if (!( decodedToken.id.toString() === user.id.toString() )) {
    return res.status(401).json({
      error: 'Access Denied'
    })
  }

  // if there is an id, then
  try {
    // query the database for every messages where user is sender or receiver
    const userMessages = await Message.find().or([
      { sender: id },
      { receiver: id },
    ])
    // get user friends
    const user = await User.findById(id)
    const userFriends = user.contacts
    // map the userFriends array into objects with friend_id and messages for each friend
    const userChats = userFriends.reduce((arr, friend) => {
      const chats = userMessages.filter(
        (message) => message.sender.toString() === friend.toString()
          || message.receiver.toString() === friend.toString(),
      )
      arr.push({
        friendId: friend,
        messages: chats
      })
      return arr
    }, [])
    // if there is a match, send 200 status with result
    res.status(200).send(userChats)
  } catch (error) {
    // if there is an error, pass it to the error middleware
    next(error)
  }
}

// controller to send user messages
const postMessageController = async (req, res, next) => {
  const token = getTokenFromHeader(req)
  /* use the stored secret to validate the token */
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

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
