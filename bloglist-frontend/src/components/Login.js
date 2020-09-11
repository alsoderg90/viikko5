import React from 'react'
import PropTypes from 'prop-types'

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
            id='username'
            type ="username"
            value={username}
            name='Username'
            onChange = {setUsername}
          />
        </div>
        <div> Password
          <input
            id='password'
            type = "password"
            value = {password}
            name = "password"
            onChange = {setPassword}
          />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm