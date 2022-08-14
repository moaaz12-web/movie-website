import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import "./css/Landing.css";

function Landingpage() {
  const [usernameReg, setusernameReg] = useState("")
  const [passwordReg, setpasswordReg] = useState("")
  const [emailReg, setemailReg] = useState("")
  let navigate = useNavigate();
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [loginStatus, setloginStatus] = useState("")
  const [regStatus, setregStatus] = useState("")
  const dispatch = useDispatch()

  const myStyle = {
    "backgroundPosition": 'center',
    "backgroundSize": 'cover',
    "backgroundRepeat": 'no-repeat', "opacity": "0.7",
    "width": '100vw', "overflow": "hidden", "border-radius": "0",
    "height": '100vh', "position": "absolute"
  }


  const register = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/register',
      { username: usernameReg, password: passwordReg, email: emailReg })
      .then((response) => {
        // console.log(response)
        setregStatus(`Registered successfully! Now login ${usernameReg}`)
        document.querySelector('.bbbnnn1').disabled = true;
        document.getElementsByClassName('regInput')[0].value = "";
        document.getElementsByClassName('regInput')[1].value = "";
        document.getElementsByClassName('regInput')[2].value = "";
      })
  }

  const logon = (e) => {
    e.preventDefault()

    Axios.post('http://localhost:5000/login',
      { username: username, password: password }).then((response) => {
        if (response.data.message) {
          setloginStatus(response.data.message)
        } else {
          setloginStatus(response.data[0].username)
      

          dispatch(login({
            name: response.data[0].username,
            email: response.data[0].email,
            loggedIn: true,
          }))



          navigate(`/Home`, { state: { userName: response.data[0].username, userEmail: response.data[0].email } })
        }
      })
  }

  return (
    <div >
      <img src="\intro img.jpg" style={myStyle}></img>
      <div className="App" >

        <form >
          <p>Registration</p>
          {/* <label>Username</label> */}
          <input type="text" className="regInput" onChange={(e) => { setusernameReg(e.target.value) }} placeholder="Enter Username"></input>
          {/* <label>Email</label> */}
          <input type="email" className="regInput" onChange={(e) => { setemailReg(e.target.value) }} placeholder="Enter Email"></input>
          {/* <label>Password</label> */}
          <input type="password" className="regInput" onChange={(e) => { setpasswordReg(e.target.value) }} placeholder="Enter Password"></input>
          <br></br>
          <button className="bbbnnn1" onClick={(e) => { register(e) }}>Register</button>
        </form>

        <div>{regStatus}</div>



        <form>
          <p>Sign In!</p>
          <input type="text" className="regInput" onChange={(e) => { setusername(e.target.value) }} placeholder="Enter Username"></input>
          <input type="password" className="regInput" onChange={(e) => { setpassword(e.target.value) }} placeholder="Enter Password"></input>
          <div>{loginStatus}</div>
          <br></br>
          <button className="bbbnnn2" onClick={(e) => { logon(e) }}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Landingpage