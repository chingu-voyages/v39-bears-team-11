// import the Message model
const Message = require('../models/message')

// controller to fetch user messages
const getMessageController = (req, res, next) => {
  // get the user id from the request body
  const { user_id: id } = req.body

  // search database with received user_id
  Message.findOne({ user_id: id }, (error, result) => {
    // if there is error, pass it to the
    // error handler middleware
    if (error) {
      next(error)
    }

    // if there is a match, set the statusCode
    // and send the returned result
    res.status(200).send(result)
  })
}

// controller to send user messages
const postMessageController = async (req, res, next) => {
  // get the request payload
  const { message } = req.body

  // check if there is no message,
  // and if so end the response
  if (!message) {
    res.status(400).end()
  }

  // if there is a message in the request, then
  try {
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
