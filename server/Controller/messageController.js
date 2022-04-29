// import the Message model
const Message = require('../models/message')

const getMessageController = async (req, res) => {
  // get the user id from the request body
  const { user_id: id } = req.body

  Message.findOne({ user_id: id }, (err, result) => {
      
  })
}
