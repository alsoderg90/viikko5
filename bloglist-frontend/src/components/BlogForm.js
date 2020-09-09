import React from 'react'


const BlogForm = ({title,author,url,setUrl,setAuthor,setTitle,newBlog,setBlogsVisible}) => {

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={newBlog}> 
            <div> Title: <input type="text" value={title} name="title" onChange={setTitle}/></div> 
            <div> Author: <input type="text" value={author} name="author" onChange={setAuthor}/></div> 
            <div> Url: <input type="text" value={url} name="url" onChange={setUrl}/></div> 
            <button type="submit"> Create </button>
            </form>
            <button onClick={() => setBlogsVisible(false)}> Cancel </button>
        </div>
    )
}

export default BlogForm