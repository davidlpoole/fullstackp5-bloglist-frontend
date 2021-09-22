import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const InputBox = (props) => {
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <input type={props.type} value={props.value} onChange={props.onChange}></input>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'LoggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      setTimeout(() => {
        // setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('LoggedInBlogAppUser')
  }

  const handleAddNew = async (event) => {
    event.preventDefault()
    const newBlog = {
      author: author,
      title: title,
      url: url
    }

    await blogService
      .addNew(newBlog)
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setURL('')

  }

  return (


    <div>
      <h1>Blogs</h1>
      {
        user === null ? // IF NO USER IS LOGGED IN - ONLY SHOW LOGIN FORM
          <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
              <InputBox type='text' label='Username' value={username} onChange={({ target }) => setUsername(target.value)} />
              <InputBox type='text' label='Password' value={password} onChange={({ target }) => setPassword(target.value)} />
              <button type='Submit'>Login</button>
            </form>
          </div>
          : // IF USER IS LOGGED IN - SHOW BLOGS
          <div>

            <div>
              Logged in as {user.name} <button onClick={handleLogout}>logout</button>
            </div>
            <h2>Add a blog</h2>
            <form onSubmit={handleAddNew}>
              <InputBox type='text' label='Title' value={title} onChange={({ target }) => setTitle(target.value)} />
              <InputBox type='text' label='Author' value={author} onChange={({ target }) => setAuthor(target.value)} />
              <InputBox type='text' label='URL' value={url} onChange={({ target }) => setURL(target.value)} />
              <button type='Submit'>Add new</button>
            </form>
            <h2>Your bloglist</h2>
            <ul>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </ul>
          </div>
      }

    </div>
  )
}

export default App