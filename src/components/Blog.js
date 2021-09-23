import React from 'react'

const Blog = ({ blog }) => (
  <li key={blog.id}>
    <a href={blog.url}>{blog.title}</a> by {blog.author}
  </li>
)


const BlogList = (props) => {

  return (
    <ul>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  )
}


export default BlogList