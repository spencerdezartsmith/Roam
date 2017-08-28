const User = require('../models/user')

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
          .then(savedUser => res.send({ user: savedUser }))
      }
    })
}
