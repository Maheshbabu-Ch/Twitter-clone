// import React,{useState} from 'react'
// import axios from 'axios' 
// export default function Home() {
//     const [username , setUsername] = useState("")
//     const [password,setPassword] = useState("")
//     function save(e)
//     {
//         setUsername(e.target.value)
//     }
//     function show()
//     {
//         console.log(username,password)
//         // axios.post("https://reqres.in/api/users",{name:username,passcode:password})
//         // axios.post("http://localhost:4000/add",{name:username,passcode:password})
//            axios.post("https://projectbackend-pxjw.onrender.com/add",{name:username,passcode:password})


//         .then((res)=>{
//           console.log(res)
//         })
//         setUsername("")
//         setPassword("")
//     }
//   return (
//     <div>
//         <p><input value={username} placeholder = "Enter name" onChange={save}/></p>
//         <p><input value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/></p>
//         <button onClick={show}>Submit</button>
//     </div>
//   )
// }

// import React from 'react'
// import './Style.css'

// export default function Home() {
//   return (
//     <div className='home'>
//       <div id="sec1">
//         <h1>Tweetify</h1>
//         <p id="caption"> Where conversations take flight! </p>
//       </div>
//       <div>
//       <p>Join the Tweetify community and share your thoughts, ideas, and updates with the world. </p>

//         <p> Welcome to Tweetify, the ultimate social platform for connecting, engaging, and expressing yourself! With Tweetify, you can post updates, follow others, and join vibrant discussions on a wide range of topics. Share your thoughts, insights, and moments that matter with our diverse community of users.</p>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import Navleft from './Navleft'
import Navmid from './Navmid'
import Navright from './Navright'
import { Navigate } from 'react-router-dom';

export default function Main() {
  
  return (
    <div>
    {localStorage.getItem('token')?
    <div className='homep'>
      <Navleft/>
      {/* <Navmid info={temp}/> */}
      <Navmid />
      <Navright/>
    </div> : <Navigate to="/login"/> }</div>
  )
}
