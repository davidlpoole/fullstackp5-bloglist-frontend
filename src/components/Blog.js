import React from 'react'
const Blog = ({ blog }) => (
  <li key={blog.id}>
    "{blog.title}" by {blog.author}
  </li>
)

export default Blog