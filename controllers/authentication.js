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
          .then(savedUser => {
            User.findById(savedUser.id)
              .then(user => {
                const { id, username, currentCity, profilePhoto, created_at } = user.attributes
                res.send({
                  username,
                  currentCity,
                  profilePhoto,
                  created_at,
                  token: tokenForUser(id)
                })
              })
          })
      }
    })
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}

exports.signin = (req, res, next) => {
  const { id, username, currentCity, profilePhoto, created_at } = req.user.attributes
  res.send({
    username,
    currentCity,
    profilePhoto,
    created_at,
    token: tokenForUser(id)
  })
  .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}
