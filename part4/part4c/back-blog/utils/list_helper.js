var _ = require('lodash')

const dummy = (blogs) => {
  return blogs === null ? 1 : 1
}

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return array.length === 0 ? 0 : array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
  var max = 0
  for (var i = 0; i < array.length; i++){
    if (array[i].likes > max){
      max = array[i].likes
    }
  }
  for (var j = 0; j < array.length; j++){
    if (array[j].likes === max){
      return {
        title: array[j].title,
        author: array[j].author,
        likes: array[j].likes
      }
    }
  }
}

const mostBlogs = (array) => {
  var myObj = _.countBy(array, 'author')
  var maxKey = _.max(Object.keys(myObj), o => myObj[o])
  const values = Object.values(myObj)
  var maxValue = Math.max(...values)
  return {
    author: maxKey,
    blogs: maxValue
  }
}

const mostLikes = (array) => {
  var authByLikesArray = _(array).groupBy('author').map((objs, key) => ({
    'author': key,
    'likes': _.sumBy(objs, 'likes')
  })).value()
  var maxLikes = _.maxBy(authByLikesArray, x => x.likes)
  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}