const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const config = require('../config')

const localOptions = { usernameField: 'email' }

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findByEmail(email)
    .then(user => {
      if (!user) { return done(null, false) }
      if (user) {
        user.comparePasswords(password, function(err, isMatch) {
          if (err) { return done(err, false) }
          if (!isMatch) {
            return done(null, false, { message: 'Invalid login credentials' })
          }

          return done(null, user)
        })
      }
    })
    .catch(err => done(err))
})

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader('auth')
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    .then(user => {
      console.log('from jwt', user);
      if (!user) {
        return done(null, false)
      } else {
        return done(null, user)
      }
    })
    .catch(err => done(err, false))
})

passport.use(jwtLogin)
passport.use(localLogin)
