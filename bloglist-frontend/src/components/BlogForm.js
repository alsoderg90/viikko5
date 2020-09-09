import React, { useState } from 'react'

const BlogForm = ({ setBlogsVisible,addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = (event) => {
    event.preventDefault()
    const newBlog = { title: title, author: author, url: url }
    addBlog(newBlog)
    setUrl('')
    setTitle('')
    setAuthor('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={newBlog}>
        <div> Title: <input type="text" value={title} name="title" onChange={({ target }) => {setTitle(target.value)}}/></div>
        <div> Author: <input type="text" value={author} name="author" onChange={({ target }) => {setAuthor(target.value)}}/></div>
        <div> Url: <input type="text" value={url} name="url" onChange={({ target }) => {setUrl(target.value)}}/></div>
        <button type="submit"> Create </button>
      </form>
      <button onClick={() => setBlogsVisible(false)}> Cancel </button>
    </div>
  )
}

export default BlogForm