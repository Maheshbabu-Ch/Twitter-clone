import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import "./Style.css"
import Nav from "./Navigation"
export default function Signup() {
  const navigate = useNavigate();
  const [register, setregister] = useState({ name: '', username: '', email: '', password: '' });
  const changeHandler = (e) => {
      setregister({ ...register, [e.target.name]: e.target.value });
  }
  const submitHandler = (e) => {
      e.preventDefault();
      
      axios.post(`https://backend-tweetify.onrender.com/api/auth/register`, register)
      .then(res => { 
        toast.success(`${res.data}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      setTimeout(() => {
        navigate('/login')
      }, 5000);
       }).catch(err => alert(err.response.data));
  }

  return (
    <div id="loginpage">
    <Nav/>
    <div className="container">
    <div id='loginform'> 
      <h2>Sign-up</h2>
      <form id='loginf' onSubmit={submitHandler}>
        <table>
            <tr>
                <td>Name</td>
                <td><input name="name" type='text' placeholder='Enter your Name' onChange={changeHandler} required autoComplete='off'/></td>
            </tr>
            <tr>
                <td>UserName</td>
                <td><input name="username" type='text' placeholder='Enter a UserName' onChange={changeHandler} required/></td>
            </tr>
          <tr>
            <td>Email</td>
            <td><input name="email" type='email' placeholder='Enter your Email' onChange={changeHandler} required/></td>
          </tr>
          <tr>
            <td>Password</td>
            <td><input name="password" type='password' placeholder='Enter your Password' onChange={changeHandler} title='' required/></td>
          </tr>
        </table>
        <div>
        <p><input id="loginbtn" type='submit' value="Signup" /></p>
          </div>
          <div><p>Have an account already? <Link id="link" to="/login">Log in</Link></p></div>
      </form>
      </div>
      <ToastContainer />
      </div>
    </div>
    
  )
}
