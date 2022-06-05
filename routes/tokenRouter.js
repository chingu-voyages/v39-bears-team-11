const { Router } = require('express')

const {
  postTokenController,
  deleteTokenController,
} = require('../Controller/tokenController')

const router = Router()

router.post('/', postTokenController)
router.delete('/:id', deleteTokenController)

module.exports = router
