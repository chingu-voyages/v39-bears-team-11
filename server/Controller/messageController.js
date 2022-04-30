// import the Message model
const Message = require('../models/message')

const getMessageController = async (req, res, next) => {
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

module.exports = {
  getMessageController,
}
