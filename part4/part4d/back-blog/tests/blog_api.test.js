const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash, name: 'Max' })
  await user.save()
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    const token = await helper.userToken()
    await api
      .get('/api/blogs')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const token = await helper.userToken()
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogss', async () => {
    const token = await helper.userToken()
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token)
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'message1'
    )
  })
})

describe('viewing a specific blog', () => {

  test('id is defined', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    blogsAtEnd.map(r => expect(r.id).toBeDefined())
  })

  test('there are three blogs', async () => {
    const token = await helper.userToken()
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the blog is about message', async () => {
    const token = await helper.userToken()
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token)
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('message1')
  })

  test('a specific blog can be viewed', async () => {
    const token = await helper.userToken()
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    //const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('addition of a new blog', () => {

  test('a valid blog can be added', async () => {
    const token = await helper.userToken()
    const newBlog = {
      'title': 'async/await simplifies making async calls',
      'author': 'Maxim',
      'url': 'Url',
      'likes': 66
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token )
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('a valid blog without token cant be added', async () => {
    const newBlog = {
      'title': 'async/await simplifies making async calls',
      'author': 'Maxim',
      'url': 'Url',
      'likes': 66
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(titles).not.toContain(
      'async/await simplifies making async calls'
    )
  })

  test('blog without title or url are not added', async () => {
    const token = await helper.userToken()
    const usersAtStart = await helper.usersInDb()
    const newblogWoTitle = {
      author: 'Maxim1',
      url: 'Url1',
      likes: 666,
      userId: usersAtStart[0].id
    }

    const newblogWoUrl = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim1',
      likes: 666,
      userId: usersAtStart[0].id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newblogWoTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newblogWoUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('default value of likes property', async () => {
    const token = await helper.userToken()
    const usersAtStart = await helper.usersInDb()
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim',
      url: 'Url',
      userId: usersAtStart[0].id
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
    const blogsAtEnd = await helper.blogsInDb()
    const defaultLikes = blogsAtEnd.map(r => r.likes)
    expect(defaultLikes).toContain(0)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const token = await helper.userToken()
    const newBlog = {
      'title': 'async/await simplifies making async calls',
      'author': 'Maxim',
      'url': 'Url',
      'likes': 66
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token )
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length-1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd2 = await helper.blogsInDb()

    expect(blogsAtEnd2).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd2.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('failds with status code 400 if id is invalid', async () => {
    const token = await helper.userToken()
    const invalidId = 645645676856785

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', token)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('edition of a blog', () => {
  test('edit a blog with a valid id', async () => {
    const token = await helper.userToken()
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim',
      url: 'Url',
      likes: 66,
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(newBlog.title)
  })

  test('edit a blog with an invalid id', async () => {
    const token = await helper.userToken()
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim',
      url: 'Url',
      likes: 66,
    }

    const invalidId = '63839ceae795575b452b781a'

    await api
      .put(`/api/blogs/${invalidId}`)
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(newBlog.title)
  })

  test('edit a blog without url, title', async () => {
    const token = await helper.userToken()
    const newBlogWoTitle = {
      author: 'Maxim',
      url: 'newUrl',
      likes: 66,
    }
    const newBlogWoUrl = {
      title: 'newTitle',
      author: 'Maxim',
      likes: 66,
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToEditTitle = blogsAtStart[0]
    const blogToEditUrl = blogsAtStart[1]

    await api
      .put(`/api/blogs/${blogToEditTitle.id}`)
      .set('Authorization', token)
      .send(newBlogWoTitle)
      .expect(400)

    await api
      .put(`/api/blogs/${blogToEditUrl.id}`)
      .set('Authorization', token)
      .send(newBlogWoUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(newBlogWoUrl.title)

    const urls = blogsAtEnd.map(r => r.url)

    expect(urls).not.toContain(newBlogWoTitle.url)
  })

})

afterAll(() => {
  mongoose.connection.close()
})