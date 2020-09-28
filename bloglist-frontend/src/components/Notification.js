import React from 'react'

const Notification = ({ message, messageClass }) => {
  if (message !== null) {
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

export default Notification