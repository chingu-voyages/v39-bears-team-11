const { Router } = require('express')

const {
  peopleController,
} = require('../Controller/peopleController')

const router = Router()

router.post('/', peopleController)

module.exports = router

