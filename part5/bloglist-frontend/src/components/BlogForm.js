import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <form onSubmit={addBlog}>
      Title <input value={newTitle} onChange={handleTitleChange} placeholder='Title' id='title' /> <br />
      Author <input value={newAuthor} onChange={handleAuthorChange} placeholder='Author' id='author' /> <br />
      Url <input value={newUrl} onChange={handleUrlChange} placeholder='Url' id='url' /> <br />
      <br />
      <button type="submit" id='create'>Create</button>
      <br />
      <br />
    </form>
  )
}

export default BlogForm
