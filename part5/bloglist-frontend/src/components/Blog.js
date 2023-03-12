import { useState } from 'react'

const Blog = ({ blog, addLike, remove, user }) => {
  const [showState, setShowState] = useState(false)

  const hideBlog = { display: showState ? 'none' : '' }
  const showBlog = { display: showState ? '' : 'none' }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const removeStyle = {
    backgroundColor: 'CornflowerBlue',
    display: user === blog.user.username ? '' : 'none'
  }

  const handleShowBlog = () => {
    setShowState(!showState)
  }

  const handleIncreaseLikes = () => {
    addLike({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  return (
    <div style={blogStyle}>
      <div style={hideBlog}>
        <span>Title: {blog.title} </span><button onClick={handleShowBlog}>View</button> <button style={removeStyle} onClick={remove}>Remove</button><br/>
      </div>
      <div style={showBlog}>
        <span>Title: {blog.title} </span><button onClick={handleShowBlog}>Hide</button> <button style={removeStyle} onClick={remove}>Remove</button><br/>
        <span>Author: {blog.author}</span><br/>
        <span>Url: {blog.url}</span><br/>
        <span>Likes: {blog.likes} </span> <button onClick={handleIncreaseLikes}>Like</button><br/>
      </div>
    </div>
  )}

export default Blog
