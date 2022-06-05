const { Router } = require('express')
const multer  = require('multer')
const multerStorage = multer.memoryStorage()
const upload = multer({ storage: multerStorage, })

// import the user route controllers
const {
  getUsersController,
  postUserController,
  putUserController,
  deleteUserController,
} = require('../Controller/userController')

const router = Router()

router.get('/', getUsersController)
router.post('/', postUserController)
router.put('/:id', upload.single('image'), putUserController)
router.delete('/:id', deleteUserController)

module.exports = router

