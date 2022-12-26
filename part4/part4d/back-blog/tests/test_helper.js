const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    'title': 'message1',
    'author': 'max1',
    'url': 'url1',
    'likes': 11,
  },
  {
    'title': 'message2',
    'author': 'max2',
    'url': 'url2',
    'likes': 22,
  },
  {
    'title': 'message3',
    'author': 'max3',
    'url': 'url3',
    'likes': 33,
  }
]

const initialUser = [
  {
    'username': 'root',
    'name': 'Superuser',
    'blogs': [],
    'id': '639e0394bae193364b073f1e'
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const userToken = async () => {
  const userInDb = await usersInDb()
  const userForToken = {
    username: userInDb[0].username,
    id: userInDb[0].id,
  }
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: '1h' }
  )
  return 'bearer ' + token
}

module.exports = {
  initialBlogs, initialUser, nonExistingId, blogsInDb, usersInDb, userToken
}