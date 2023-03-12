import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [style, setStyle] = useState(0)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      setStyle(0)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    } catch (exception) {
      setStyle(1)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const addLike = (blogObject1) => {
    blogService
      .update(blogs.find((x) => x.title === blogObject1.title).id, blogObject1)
      .then((returnedBlog) => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
        setErrorMessage(
          'The blog \'' +
            returnedBlog.title +
            '\' likes changed to ' +
            returnedBlog.likes
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
      .catch(() => {
        setStyle(1)
        setErrorMessage('Something wrong with likes counter')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(returnedBlog.title + ' added')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
      .catch(() => {
        setStyle(1)
        setErrorMessage('Invalid blog is not added')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
  }

  const deleteBlog = (id) => {
    console.log(user)
    console.log(blogs.find((x) => x.id === id))
    if (
      window.confirm('Remove ' + blogs.find((x) => x.id === id).title + ' ?')
    ) {
      blogService.remove(id).catch(() => {
        setStyle(1)
        setErrorMessage(
          'Infromation of the blog has already been removed from server'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
      const newBlogs = blogs.filter((x) => x.id !== id)
      return setBlogs(newBlogs)
    } else {
      return setBlogs(blogs)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const clearLocalStorage = () => {
    window.localStorage.clear()
    setUser(null)
    setBlogs([])
  }

  return (
    <div>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          style={style}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      )}
      {user && (
        <div>
          <h1>Blogs</h1>
          <Notification message={errorMessage} state={style} />
          <p>{user.name} logged-in</p>{' '}
          <button onClick={clearLocalStorage}>Logout</button>
          <br />
          <br />
          <Togglable buttonLabel="New blog">
            <h2>Create new</h2>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>Existing blogs</h2>
        </div>
      )}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((x) => (
          <Blog
            key={x.id}
            blog={x}
            addLike={addLike}
            remove={() => deleteBlog(x.id)}
            user={user.username}
          />
        ))}
    </div>
  )
}

export default App
