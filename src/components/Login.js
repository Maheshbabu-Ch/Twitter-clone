// import React,{ useState } from 'react'
// import "./Style.css"
// import Nav from "./Navigation"
// import axios from 'axios'
// import { useNavigate,} from 'react-router-dom'

// export default function Login() {

//     const navigate = useNavigate();
//     const [error, setError ]= useState('')
//     const [login, setLogin] = useState({ email: '', password: '' });
//     const changeHandler = (e) => {
//         setLogin({ ...login, [e.target.name]: e.target.value }) ;}
//     const submitHandler = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:5000/api/auth/login', login)
//             .then(res => {
//             console.log(res.data);
//             localStorage.setItem('token', res.data.token);
//             localStorage.setItem('username', res.data.info.username)
//             localStorage.setItem('email', res.data.info.email)
//             localStorage.setItem('name', res.data.info.name)
//             localStorage.setItem('userID',res.data.info._id)
//             localStorage.setItem('pic',res.data.info.pic)
//             const currentUser = res.data.info;
//             console.log("currentUser: ",currentUser)
//             navigate("/home");})
//         .catch(err => {setError("Invalid username or password")})
//     }
        

//     return (
//         <div>
//             <Nav/>
//         <div id='loginform'> 
//         <h2>Sign-In</h2>
//         {error && <p id="center">{error}</p>}
//         <form id='loginf' onSubmit={submitHandler}>
//             <table>
//             <tbody>
//             <tr>
//                 <td>Email</td>
//                 <td><input name="email" type='text' placeholder='Enter your Email' onChange={changeHandler} required autoComplete='off'/></td>
//             </tr>
//             <tr>
//                 <td>Password</td>
//                 <td><input name="password" type='password' placeholder='Enter your Password' onChange={changeHandler} required/></td>
//             </tr></tbody>
//             </table>
//             <div>
//             <p><input type='submit' value="Login"/></p>
//             </div>
//       </form>
//     </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import "./Style.css";
import Nav from "./Navigation";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [login, setLogin] = useState({ email: '', password: '' });
  localStorage.clear();
  const changeHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', login)
      .then(res => {
        // console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.info.username);
        localStorage.setItem('email', res.data.info.email);
        localStorage.setItem('name', res.data.info.name);
        localStorage.setItem('userID', res.data.info._id);
        localStorage.setItem('pic', res.data.info.pic);
        navigate("/home");
      })
      .catch(err => {
        setError("Invalid username or password");
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 60000); // 1 minute in milliseconds

    return () => clearTimeout(timeout);
  }, [navigate]);


  return (
    <div>
      <Nav />
      <div id='loginform'>
        <h2>Sign-In</h2>
        {error && <p id="center">{error}</p>}
        <form id='loginf' onSubmit={submitHandler}>
          <table>
            <tbody>
              <tr>
                <td>Email</td>
                <td><input name="email" type='text' placeholder='Enter your Email' onChange={changeHandler} required autoComplete='off' /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input name="password" type='password' placeholder='Enter your Password' onChange={changeHandler} required /></td>
              </tr>
            </tbody>
          </table>
          <div>
            <p><input type='submit' value="Login" /></p>
          </div>
        </form>
      </div>
    </div>
  );
}
