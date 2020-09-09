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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm