import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [style, setStyle] = useState(0);

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
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      ) 

      setUser(user);
      setStyle(0);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    } catch (exception) {
      setStyle(1);
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };


  const addBlog = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const noteObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    };

    blogService
      .create(noteObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setErrorMessage(returnedBlog.title + " added");
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        setNewLikes("");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      })
      .catch(() => {
        setStyle(1);
        setErrorMessage("Invalid blog is not added");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value);
  };

  const clearLocalStorage = () => {
    window.localStorage.clear();
    setUser(null);
    setBlogs([]);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} state={style} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );



  const blogForm = () => (
    <form onSubmit={addBlog}>
      title <input value={newTitle} onChange={handleTitleChange} /> <br />
      author <input value={newAuthor} onChange={handleAuthorChange} /> <br />
      url <input value={newUrl} onChange={handleUrlChange} /> <br />
      likes <input value={newLikes} onChange={handleLikesChange} /> <br />
      <button type="submit">Create</button>
    </form>
  );

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h1>Blogs</h1>
          <Notification message={errorMessage} state={style} />
          <p>{user.name} logged-in</p> <button onClick={clearLocalStorage}>Logout</button>
          <h2>Create new</h2>
          {blogForm()}
          <h2>Existing blogs</h2>
        </div> 
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
