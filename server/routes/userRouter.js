const { Router } = require('express')

// import the message route controllers
const {
  getUsersController,
  postUserController,
} = require('../Controller/usersController')

const router = Router()

router.get('/', getUsersController)
router.post('/', postUserController)

module.exports = router
