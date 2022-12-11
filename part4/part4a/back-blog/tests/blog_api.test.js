const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogss', async () => {
    const response = await api.get('/api/blogs')
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
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the blog is about message', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('message1')
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    //const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('addition of a new blog', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim',
      url: 'Url',
      likes: 66,
    }

    await api
      .post('/api/blogs')
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

  test('blog without title or url are not added', async () => {
    const newblogWoTitle = {
      author: 'Maxim1',
      url: 'Url1',
      likes: 666,
    }

    const newblogWoUrl = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim1',
      likes: 666,
    }

    await api
      .post('/api/blogs')
      .send(newblogWoTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newblogWoUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('default value of likes property', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim',
      url: 'Url',
    }
    await api
      .post('/api/blogs')
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
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('failds with status code 400 if id is invalid', async () => {
    const invalidId = 645645676856785

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('edition of a blog', () => {
  test('edit a blog with a valid id', async () => {
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
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(newBlog.title)
  })

  test('edit a blog with an invalid id', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Maxim',
      url: 'Url',
      likes: 66,
    }

    const invalidId = '63839ceae795575b452b781a'

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(newBlog.title)
  })

  test('edit a blog without url, title', async () => {
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
      .send(newBlogWoTitle)
      .expect(400)

    await api
      .put(`/api/blogs/${blogToEditUrl.id}`)
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