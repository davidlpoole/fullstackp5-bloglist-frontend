import React from 'react'
import Toggle from './Toggle'

const Blog = ({ blog }) => (
  <li key={blog.id}>
    <a href={blog.url}>{blog.title}</a> by {blog.author}
    <Toggle buttonShow='details' buttonHide='hide' >
      <ul>
        <li key='likes'>Likes: {blog.likes} <button>like</button></li>
        <li key='url'>URL: {blog.url}</li>
        <li key='user'>User: {blog.user.name}</li>
      </ul>
    </Toggle>
  </li>
)

const BlogList = ({ blogs }) => {

  return (
    <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  )
}


export default BlogList