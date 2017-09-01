const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signup = (req, res, next) => {
  const { username, email, password, current_city } = req.body

  if (!username || !email || !password || !current_city) {
    res.status(422).send({ error: 'All fields are required!' })
  }

  User.findByEmail(email)
    .then(user => {
      if (user) {
        res.status(422).send({ error: 'Email already in use.' })
      } else {
        new User({ username, email, password, current_city }).save()
          .then(savedUser => {
            User.findById(savedUser.id)
              .then(user => {
                const { id, username, current_city, profile_photo, created_at } = user.attributes
                res.send({
                  username,
                  current_city,
                  profile_photo,
                  created_at,
                  token: tokenForUser(savedUser)
                })
              })
          })
      }
    })
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}

exports.signin = (req, res, next) => {
  const { id, username, current_city, profile_photo, created_at } = req.user.attributes
  res.send({
    username,
    current_city,
    profile_photo,
    created_at,
    token: tokenForUser(req.user.attributes)
  })
}
