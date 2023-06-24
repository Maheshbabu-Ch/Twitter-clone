import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
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
      axios.post(`http://localhost:5000/api/auth/register`, register).then(res => { alert(res.data); navigate('/login') }).catch(err => alert(err.response.data));
  }

  return (
    <div><Nav/>
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
            <td><input name="email" type='text' placeholder='Enter your Email' onChange={changeHandler} required/></td>
          </tr>
          <tr>
            <td>Password</td>
            <td><input name="password" type='password' placeholder='Enter your Password' onChange={changeHandler} required/></td>
          </tr>
        </table>
        <div>
          <p><input type='submit' value="Signup"/></p>
        </div>
      </form>
      </div>
    </div>
  )
}
