require('../services/passport')
const router = require('express').Router()
const passport = require('passport')
const UserController = require('../controllers/users')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.post('/signup', UserController.signup)
router.post('/signin', requireSignin, UserController.signin)

module.exports = router
