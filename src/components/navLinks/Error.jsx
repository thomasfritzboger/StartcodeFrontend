import React from 'react'

const Error = ({errorMsg}) => {
  return (
    <div>
      <h2>Page not found</h2>
      <p>{errorMsg}</p>
    </div>
  )
}

export default Error
