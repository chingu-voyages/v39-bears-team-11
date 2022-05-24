// import the router function from the express module
const { Router } = require('express')
const multer  = require('multer')
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, });
// import the message route controllers
const {
  getMessageController,
  postMessageController,
} = require('../Controller/messageController')

// expose Router function to router const
const router = Router()

// set up a get route
router.get('/:user_id', getMessageController)

// set up a post route
router.post('/', upload.single('image'), postMessageController)

// export messageRouter module
module.exports = router
