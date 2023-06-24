import React from 'react'
import logo from "../../logo1.png"
import "./Home.css"
import { Link } from 'react-router-dom'

export default function Navleft() {

    function logouthandler()
    {
        localStorage.clear();
        window.location = "/"
        alert("logged out")
    }

  return (
    
    <div className="nav1">
        <div className='Navleft'>
            <div id="logo">
                <img src={logo} alt="#" />
            </div>
            <div id="links">
            <Link to="/home">
                <div id="one" >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path></g></svg>
                    <span>Home</span>
                </div>
                </Link>
                {/* <Link to="/explore">
                <div id="one">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>                    
                    <span>Explore</span>
                </div>
                </Link> */}
                {/* <div id="one">
                <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g></svg>                    
                <span>Notifications</span>
                </div> */}
                <Link to={`/profile/${localStorage.getItem('userID')}`}>
                <div id="one">
                <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>
                <span>Profile</span>
                </div></Link>
                <div id="tweet">
                    Tweet
                </div>
            </div>
        </div>
        <div id="userbox">
                    <div id="logprof"> 
                    <img id="profile_pic" src={localStorage.getItem('pic')} alt="profile"></img>
                    <div>
                    <p>{localStorage.getItem('name')}</p>
                    {/* {name}</p> */}
                    <p>{localStorage.getItem('username')}</p>
                    {/* {username}</p> */}
                    </div>
                    </div>
                    <Link id="logout" to="/login" onClick={logouthandler}>Logout</Link>
                </div>
    </div>
  )
}
