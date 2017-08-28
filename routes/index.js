const router = require('express').Router()
const UserController = require('../controllers/users')

router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.post('/signup', UserController.signup)

module.exports = router
