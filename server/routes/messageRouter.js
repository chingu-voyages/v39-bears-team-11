// import the router function from the express module
const { Router } = require('express')

// expose Router function to router const
const router = Router()

// set up a get route
router.get('/', getMessageController)

// set up a post route
router.post('/', postMessageController)

// export messageRouter module
module.exports = router

