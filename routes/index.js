require('../services/passport')
const router = require('express').Router()
const passport = require('passport')
const AuthController = require('../controllers/authentication')
const UsersController = require('../controllers/users')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.post('/signup', AuthController.signup)
router.post('/signin', requireSignin, AuthController.signin)

router.get('/users/:id', UsersController.getOneUser)

module.exports = router
