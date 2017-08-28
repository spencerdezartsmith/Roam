const bookshelf = require('./db/bookshelf')
const Post = require('./post')

const City = bookshelf.Model.extend({
  tableName: 'cities',
  posts: function() {
    return this.hasMany(Post)
  }
})

module.exports = City
