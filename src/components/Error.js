import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='center'>
        <p>Hmm...this page doesn’t exist.</p>
        <p>Go back or login again</p><br/>
        <Link id="logout" to="/login">Login</Link>
    </div>
  )
}
