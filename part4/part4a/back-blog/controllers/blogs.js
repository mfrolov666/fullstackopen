const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  if (body.title&&body.url){
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  if(title&&url){
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' })
    if(blog){
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } else {
      return response.status(400).end()
    }
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

module.exports = blogRouter