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
      title <input value={newTitle} onChange={handleTitleChange} /> <br />
      author <input value={newAuthor} onChange={handleAuthorChange} /> <br />
      url <input value={newUrl} onChange={handleUrlChange} /> <br />
      <br />
      <button type="submit">Create</button>
      <br />
      <br />
    </form>
  )
}

export default BlogForm
