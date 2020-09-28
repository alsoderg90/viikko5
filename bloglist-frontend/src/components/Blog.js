/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, users, setBlogs,blogs }) => {

  const voteBlog = async (blog) => {
    const newBlog = {
      title : blog.title,
      author : blog.author,
      url : blog.url,
      likes : blog.likes +1,
    }
    const updatedBlog = await blogService.update(blog.id,newBlog)
    const updatedBlogs = blogs.map(oldBlog => (oldBlog.id === updatedBlog.id) ? updatedBlog : oldBlog)
    setBlogs(updatedBlogs)
    console.log('update logi:', newBlog)
  }

  const RemoveBlog = () => {
    return (
      <button id='remove' onClick={() => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
          blogService.remove(blog.id)
        setBlogs(blogs.filter(savedblog => savedblog.id !== blog.id))
      }}> Delete
      </button>
    )
  }

  const [allInfo, showAll] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShow = () => {
    showAll(!allInfo)
  }

  const handleVote = () => {
    voteBlog(blog)
  }

  if (allInfo === false)
    return (
      <li className='blog'>
        <div style={blogStyle}><div>
          {blog.title} by {blog.author}
          <button id='view' onClick={handleShow}>View</button>
        </div>
        </div>
      </li>
    )

  else {
    return (
      <li className='all'>
        <div style={blogStyle}><div>
          <p>{blog.title} <button onClick={handleShow}> Hide </button></p>
          <p> {blog.author} </p>
          {/*eslint-disable-next-line no-unused-vars */}
          <p> Likes {blog.likes} <button id='like' onClick={handleVote}> Vote</button> </p>
          <p> {blog.url}</p>
          <p> {blog.user.name}</p>
          {RemoveBlog()}
        </div>
        </div>
      </li>
    )
  }
}

export default Blog
