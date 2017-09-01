const Post = require('../models/post')


exports.getAllPostsForUser = (req, res, next) => {
  const { userId } = req.params
  Post.query({ where: { user_id: userId } }).fetchAll()
    .then(posts => res.send({ posts }))
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}

exports.getOnePostForUser = (req, res, next) => {
  const { postId, userId } = req.params
  Post.findOnePost(postId, userId)
    .fetch()
    .then(post => res.send({ post }))
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}

exports.getAllPostsForCity = (req, res, next) => {
  const { cityId } = req.params
  Post.where({ city_id: cityId }).fetchAll()
    .then(posts => res.send({ posts }))
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}

exports.addNewPost = (req, res, next) => {
  const { cityId } = req.params
  const newPost = req.body
  newPost.city_id = cityId

  new Post(newPost).save()
    .then(savedPost => res.send({ post: savedPost }))
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}

exports.removeOnePost = (req, res, next) => {
  const { postId, userId } = req.params
  Post.findOnePost(postId, userId).destroy()
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}

exports.editOnePost = (req, res, next) => {
  const { postId, userId } = req.params
  const { title, content } = req.body
  Post.findOnePost(postId, userId)
    .then(post => {
      post.set({ title, content }).save()
        .then(updatedPost => res.send({ updatedPost }))
    })
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))

}
