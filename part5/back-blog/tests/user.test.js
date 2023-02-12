const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there is initially one user in db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value: `root`')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username less than 3 characters or undefined', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserUsernameLess = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const resultUsernameLess = await api
      .post('/api/users')
      .send(newUserUsernameLess)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const newUserUsernameUndefined = {
      name: 'Superuser',
      password: 'salainen',
    }

    const resultUsernameUndefined = await api
      .post('/api/users')
      .send(newUserUsernameUndefined)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(resultUsernameLess.body.error).toContain('username less than 3 characters or undefined')
    expect(resultUsernameUndefined.body.error).toContain('username less than 3 characters or undefined')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password less than 3 characters or undefined', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserPasswordLess = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }

    const resultPasswordLess = await api
      .post('/api/users')
      .send(newUserPasswordLess)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const newUserPasswordUndefined = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }

    const resultPasswordUndefined = await api
      .post('/api/users')
      .send(newUserPasswordUndefined)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(resultPasswordLess.body.error).toContain('password less than 3 characters or undefined')
    expect(resultPasswordUndefined.body.error).toContain('password less than 3 characters or undefined')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(() => {
  mongoose.connection.close()
})