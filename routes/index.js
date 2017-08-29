require('../services/passport')
const router = require('express').Router()
const passport = require('passport')
const AuthController = require('../controllers/authentication')
const PostsController = require('../controllers/posts')
const CitiesController = require('../controllers/cities')
const UsersController = require('../controllers/users')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.get('/', CitiesController.getAllCities)

router.post('/signup', AuthController.signup)
router.post('/signin', requireSignin, AuthController.signin)

router.put('/users/:userId/edit', requireAuth, UsersController.editProfile)

router.get('/users/:userId/posts', requireAuth, PostsController.getAllPostsForUser)
router.get('/users/:userId/posts/:postId', requireAuth, PostsController.getOnePostForUser)
router.get('/cities/:cityId/posts', requireAuth, PostsController.getAllPostsForCity)
router.post('/cities/:cityId/posts/new', requireAuth, PostsController.addNewPost)
router.put('/users/:userId/posts/:postId/edit', requireAuth, PostsController.editOnePost)
router.delete('/users/:userId/posts/:postId', requireAuth, PostsController.removeOnePost)

module.exports = router
