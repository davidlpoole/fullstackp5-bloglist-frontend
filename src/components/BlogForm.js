import React, { useState } from 'react'
import Toggle from './Toggle'
import FormInput from './FormInput'
import InputBox from './InputBox'
import blogService from '../services/blogs'

const BlogForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleAddNew = async (event) => {
    event.preventDefault()
    const newBlog = {
      author: author,
      title: title,
      url: url
    }

    const returnedBlog = await blogService
      .addNew(newBlog)

    props.setBlogs(props.blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setURL('')
  }

  if (props.user === null) {
    return null
  }

  return (
    <div>
      <h2>Your bloglist</h2>
      <Toggle buttonLabel='Add a new blog'>
        <FormInput title='Add a new blog' submitLabel='Save' onSubmit={handleAddNew}>
          <InputBox type='text' label='Title' value={title} onChange={({ target }) => setTitle(target.value)} />
          <InputBox type='text' label='Author' value={author} onChange={({ target }) => setAuthor(target.value)} />
          <InputBox type='text' label='URL' value={url} onChange={({ target }) => setURL(target.value)} />
        </FormInput>
      </Toggle>
    </div>
  )



}

export default BlogForm
