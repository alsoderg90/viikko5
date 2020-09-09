import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
//const [blog, newBlog] = useState({title:'', author:'', url:''})
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [messageClass, setMessageClass] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const Notification = ({message, messageClass}) => {
    if (message !== null && messageClass !== '') {
      if (messageClass === 'error') {
       return (
            <div className='error'>{message}</div>
       ) 
      }
      else {
        return (
          <div className='gg'>{message}</div>
        )
      }
    }
    else return null

  }

  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    }
    catch (exception) {
      setMessage('wrong credentials')
      setMessageClass('error')
      setTimeout(() => {
        setMessageClass(null)
        setMessage(null)
      }, 2500)
      setUsername('')
      setPassword('')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      {console.log(message,messageClass)}
      <Notification message={message} messageClass={messageClass} />
        <div> Username
          <input
          type ="username"
          value={username}
          name='Username'
          onChange = {({target}) => {setUsername(target.value)}}
          />
        </div>
        <div> Password
          <input 
          type = "password"
          value = {password}
          name = "password"
          onChange = {({target}) => {setPassword(target.value)}}
          />
        </div>
        <button type="submit">Login</button>
    </form>
  )

  const newBlog = (event) => {
    event.preventDefault()
    const newBlog = {title: title, author: author, url: url}
    blogService.create(newBlog).then(blog => {
    setBlogs(blogs.concat(blog))
    setUrl('')
    setTitle('')
    setAuthor('')
    setMessage(`A new blog: ${blog.title} by ${blog.author} added`)
    setMessageClass('gg')
    setTimeout(() => {
      setMessageClass(null)
      setMessage(null)
    }, 2500)
    })
  }

  const blogForm = () => (
    <div> 
        <h2>Blogs</h2>
         {console.log(message,messageClass)}
          <Notification message={message} messageClass={messageClass} />
          <p>{user.name} logged in <button onClick = {() => {
            window.localStorage.clear() 
            setUser(null)}}> Log out </button>
          </p> 
          { blogs.map(blog => <Blog key={blog.id} blog={blog}/>) }
        <h2>Create new</h2>
        <form onSubmit={newBlog}> 
        <div> Title: <input type="text" value={title} name="title" onChange={({target}) => {setTitle(target.value)}}/></div> 
        <div> Author: <input type="text" value={author} name="author" onChange={({target}) => {setAuthor(target.value)}}/></div> 
        <div> Url: <input type="text" value={url} name="url" onChange={({target}) => {setUrl(target.value)}}/></div> 
        <button type="submit"> Create </button>
        </form>
    </div> 
  )

  return (
    <div>
      {user === null ? loginForm() :
      blogForm()}
    </div>
  )
}

export default App