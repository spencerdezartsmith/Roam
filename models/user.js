const bookshelf = require('./db/bookshelf')
const Post = require('./post')

const User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Post)
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
