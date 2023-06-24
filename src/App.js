// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
import React from 'react'
// import Demo from './Demo'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Main from './components/home/Main'
import Contact from './components/Contact'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/home/Profile'
import Error from './components/Error'
class App extends React.Component 
{
 // state = { Name: "Ram" , Age:19}
  state = { isloggedIn: true}
  componentDidMount() {
    if (this.state.isloggedIn) {
      this.setState({ isloggedIn: false });
    }
  }
  render()
  {
    // return ( <body><div>
    //   <h1>Good Afternoon</h1> 
    //   <p>{this.state.Name}'s age is {this.state.Age}</p>
    //   <Demo Name="Ravi" com="Google"/>
    //   {/* <Demo Name="Sita" com="Amazon"/> */}
    // </div></body>
    // )
    return (
      <section>

        <BrowserRouter>
        {/* <Navigation/> */}
          <Routes>
            {/* <Route path="/" element= {this.state.isloggedIn ? <><Navigate to = "/login" replace/> {this.setState({isloggedIn:false})} </>: <Main/>} /> */}
            <Route path="/" element = {this.state.isloggedIn ? (<><Navigate to = "/login" replace/></>):(<Main/>)} />
            <Route path="/home" element = {<Main/>} />
            <Route path="/profile/:id" element = {<Profile/>} />
            <Route path="/about" element= {<About/>}/>
            <Route path="/contact" element= {<Contact/>}/>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/error" element= {<Error/>}/>
            <Route path="*" element= {<Navigate to="/error" replace/>}/>
          </Routes>
        </BrowserRouter>
      </section>
    )
  }
}
export default App;
