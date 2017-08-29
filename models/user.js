const bcrypt = require('bcrypt-nodejs')
const Promise = require('bluebird')
const bookshelf = require('./db/bookshelf')
const Post = require('./post')

const User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Post)
  },
  initialize: function() {
    this.on('creating', this.hashPassword)
  },
  hashPassword: function() {
    const model = this
    const hashPromise = Promise.promisify(bcrypt.hash)
    return hashPromise(model.get('password'), null, null)
      .then(hash => {
        model.set('password', hash)
      })
  },
  comparePasswords: function(password, callback) {
    const model = this
    const comparePromise = Promise.promisify(bcrypt.compare)
    return comparePromise(password, model.get('password'))
      .then(isMatch => callback(null, isMatch))
      .catch(err => callback(err))
  }
}, {
  findById: function(id) {
    return this.query({ where: { id }}).fetch()
  },
  findByEmail: function(email) {
    return this.query({ where: { email }}).fetch()
  }
})

module.exports = User
