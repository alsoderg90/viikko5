import React from 'react'


const LoginForm = ({
    setUsername,
    setPassword,
    username,
    password,
    handleLogin
   }) => { 
       return (
        <div>
        <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>   
        <div> Username
          <input
          type ="username"
          value={username}
          name='Username'
          onChange = {setUsername}
          />
        </div>
        <div> Password
          <input 
          type = "password"
          value = {password}
          name = "password"
          onChange = {setPassword}
          />
        </div>
        <button type="submit">Login</button>
        </form>
        </div> 
       )
   }


export default LoginForm