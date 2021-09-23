import React, { useState } from 'react'
import Toggle from './Toggle'
import FormInput from './FormInput'
import InputBox from './InputBox'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in as ', username)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'LoggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
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
    props.setUser(null)
    window.localStorage.removeItem('LoggedInBlogAppUser')
  }

  if (props.user === null) {
    return (
      <div>
        <Toggle buttonShow='Login' buttonHide='cancel login'>
          <FormInput title='Login' submitLabel='Login' onSubmit={handleLogin}>
            <InputBox type='text' label='username' value={username} onChange={({ target }) => setUsername(target.value)} />
            <InputBox type='password' label='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </FormInput>
        </Toggle>
      </div>
    )
  } else {
    return (
      <div>
        Logged in as {props.user.name}
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
    )

  }
}

export default LoginForm
