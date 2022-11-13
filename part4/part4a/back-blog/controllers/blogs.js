const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', (request, response, next) => {
  Blog.find({}).then(x => {
    response.json(x)
  }).catch(error => next(error))
})


blogRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save().then(x => {
    response.json(x)
  })
    .catch(error => next(error))
})


module.exports = blogRouter