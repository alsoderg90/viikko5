import React, {useState} from 'react' 
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

    const voteBlog = () => {
      const newBlog = {
        title : blog.title,
        author : blog.author,
        url : blog.url,
        likes : blog.likes +1,
        user : blog.user.id
      }

      blogService.update(blog.id.toString(),newBlog)
      blogService.getAll()
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
       <p> Likes {blog.likes} <button onClick={voteBlog(blog)}> Vote</button> </p>  
       <p> {blog.url}</p>   
       <p> {blog.user.name}</p>
      </div>
    </div>
    )
  }
}

export default Blog
