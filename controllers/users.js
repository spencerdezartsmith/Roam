const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signup = (req, res, next) => {
  const { username, email, password, currentCity } = req.body

  if (!username || !email || !password || !currentCity) {
    res.status(422).send({ error: 'All fields are required!' })
  }

  User.findByEmail(email)
    .then(user => {
      if (user) {
        res.status(422).send({ error: 'Email already in use.' })
      } else {
        new User({ username, email, password, currentCity }).save()
          .then(savedUser => res.send({ token: tokenForUser(savedUser) }))
      }
    })
}

exports.signin = (req, res, next) => {
  const { email, password } = req.body
}
