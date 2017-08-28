const bookshelf = require('./db/bookshelf')
const User = require('./user')
const City = require('./city')

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  user: function() {
    return this.belongsTo(User)
  },
  city: function() {
    return this.belongsTo(City)
  }
})

module.exports = Post
