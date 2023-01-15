import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
    const navigate = useNavigate()

  return (
    <div>
      <h2>401 - Unauthorized</h2>
      <p>You are not authorized.</p>
      <button onClick={() => navigate("/")}>Go back to home {">"}</button>
    </div>
  )
}

export default Unauthorized