require('../services/passport')
const router = require('express').Router()
const passport = require('passport')
const AuthController = require('../controllers/authentication')
const PostsController = require('../controllers/posts')
const CitiesController = require('../controllers/cities')
const UsersController = require('../controllers/users')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.get('/', (req, res, next) => {
  res.send('hello world')
})

router.post('/signup', AuthController.signup)
router.post('/signin', requireSignin, AuthController.signin)

router.put('/users/:userId', UsersController.editProfile)

router.get('/users/:userId/posts', PostsController.getAllPostsForUser)
router.get('/users/:userId/posts/:postId', PostsController.getOnePostForUser)
router.get('/cities/:cityId/posts', PostsController.getAllPostsForCity)
router.post('/cities/:cityId/posts', PostsController.addNewPost)
router.delete('/users/:userId/posts/:postId', PostsController.removeOnePost)

router.get('/cities', CitiesController.getAllCities)

module.exports = router
