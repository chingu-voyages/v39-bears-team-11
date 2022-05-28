const { Router } = require('express')

const {
  loginController,
} = require('../Controller/loginController')

const router = Router()

router.post('/', loginController)

module.exports = router
