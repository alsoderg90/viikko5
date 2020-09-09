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

      /*     user : {
          id : blog.user.id,
          name : blog.user.name,
          username : blog.user.username
        } */
    }
    const updatedBlog = await blogService.update(blog.id.toString(),newBlog)
    const updatedBlogs = blogs.map(oldBlog => (oldBlog.id === updatedBlog.id) ? updatedBlog : oldBlog)
    setBlogs(updatedBlogs)
    console.log('update logi:', newBlog)
  }

  const RemoveBlog = () => {

    console.log('blogin tekijä:',blog,'kirjautunut:', users.username)
    if (blog.user.username === users.username) return (
      <button onClick={() => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
          blogService.remove(blog.id.toString())
        setBlogs(blogs.filter(savedblog => savedblog.id !== blog.id))
      }}> Delete
      </button>
    )
    else return <p>moi</p>
  }

  const [allInfo, showAll] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (allInfo === false)
    return (
      <div style={blogStyle}><div>
        {blog.title} by {blog.author}
        <button onClick={() => {showAll(!allInfo)} }> View </button>
      </div>
      </div>
    )

  else {
    return (
      <div style={blogStyle}><div>
        <p>{blog.title} <button onClick={() => {showAll(!allInfo)} }> Hide </button></p>
        <p> {blog.author} </p>
        {/*eslint-disable-next-line no-unused-vars */}
        <p> Likes {blog.likes} <button onClick={(event) => {voteBlog(blog)}}> Vote</button> </p>
        <p> {blog.url}</p>
        <p> {blog.user.name}</p>
        {RemoveBlog()}
      </div>
      </div>
    )
  }
}

export default Blog
