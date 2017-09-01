const User = require('../models/user')

exports.editProfile = (req, res, next) => {
  const { userId } = req.params
  const { username, current_city, profile_photo } = req.body
  User.findById(userId)
    .then(user => {
      user.set({
        username,
        current_city,
        profile_photo
      })
      .save()
      .then(user => res.send({ updatedUser: user }))
    })
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}
