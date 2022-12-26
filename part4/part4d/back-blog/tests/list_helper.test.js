const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]
  const listWithoutBlog = []

  const severalBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithoutBlog)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(severalBlogs)
    expect(result).toBe(12)
  })
})

describe('the max likes blog', () => {
  const severalBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'sdfsdf',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'dfgsdfgsd',
      likes: 5
    }
  ]

  const expectedResult =  {
    title: 'React patterns',
    author: 'Michael Chan',
    likes: 7
  }

  test('the blog with the max likes', () => {
    const result = listHelper.favoriteBlog(severalBlogs)
    expect(result).toEqual(expectedResult)
  })

})

describe('the max blogs by author', () => {
  const severalBlogs = [
    {
      title: 'React patterns',
      author: 'Robert C. Martin',
      likes: 7
    },
    {
      title: 'Angular',
      author: 'Robert C. Martin',
      likes: 3
    },
    {
      title: 'Python',
      author: 'Robert C. Martin',
      likes: 4
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
  ]

  const expectedResult =  {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('the max blogs by author', () => {
    const result = listHelper.mostBlogs(severalBlogs)
    expect(result).toEqual(expectedResult)
  })

})

describe('the max likes by author', () => {
  const severalNewBlogs = [
    {
      title: 'React patterns',
      author: 'Robert C. Martin',
      likes: 7
    },
    {
      title: 'Angular',
      author: 'Robert C. Martin',
      likes: 1
    },
    {
      title: 'Python',
      author: 'Robert C. Martin',
      likes: 4
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 15
    }
  ]

  const expectedResult =  {
    author: 'Edsger W. Dijkstra',
    likes: 15
  }

  test('the max likes by author', () => {
    const result = listHelper.mostLikes(severalNewBlogs)
    expect(result).toEqual(expectedResult)
  })

})