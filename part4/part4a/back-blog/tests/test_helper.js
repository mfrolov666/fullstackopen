const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'message1',
    'author': 'max1',
    'url': 'url1',
    'likes': 11
  },
  {
    'title': 'message2',
    'author': 'max2',
    'url': 'url2',
    'likes': 22
  },
  {
    'title': 'message3',
    'author': 'max3',
    'url': 'url3',
    'likes': 33
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'Max5',
    url: 'Url5',
    likes: 99 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}