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
    <div style={blogStyle} className='blogs'>
      <div id='target' style={hideBlog}>
        <span>Title:{blog.title}</span><button id='view' onClick={handleShowBlog}>View</button> <button style={removeStyle} onClick={remove} id='remove'>Remove</button><br/>
      </div>
      <div style={showBlog}>
        <span>Title:{blog.title}</span><button id='hide' onClick={handleShowBlog}>Hide</button> <button style={removeStyle} onClick={remove}>Remove</button><br/>
        <span>Author:{blog.author}</span><br/>
        <span>Url:{blog.url}</span><br/>
        <span>Likes:{blog.likes}</span> <button id='like' onClick={handleIncreaseLikes}>Like</button><br/>
      </div>
    </div>
  )}

export default Blog
