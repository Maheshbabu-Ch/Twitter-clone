import React from 'react'
import "./Style.css"
import { Link } from 'react-router-dom'
import logo from "../logo1.png"


export default function Navigation() {
  return (
    <div className='login'>
        <div id="logo">
            <img src={logo} alt="logo"></img>
        </div>
        <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/about">About</Link>
        </div>
    </div>
  )
}