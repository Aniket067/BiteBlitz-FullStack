import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

  const { url,setToken } = useContext(StoreContext)
  const [currentState, setCurrentState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onChangeHandler = () => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currentState == "Login") {
      newUrl += "/api/user/login"

    }
    else {
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
               setToken(response.data.token);
               localStorage.setItem("token",response.data.token)
               setShowLogin(false)

    }
    else{
      alert(response.data.message)
      
    }
  }

  // for checking wheter entries working or not
  // useEffect(() => {
  //   console.log(data)
  // }, [data])


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin}
        className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter Your Name' required />}

          <input name='email' type="email" onChange={onChangeHandler} value={data.email} id="" required
            placeholder='Enter Your Email' />
          <input type="password" placeholder='Enter Your Password' required name='password' onChange={onChangeHandler} value={data.password} />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing,I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? <p>Create a new Account. <span onClick={() => setCurrentState("Sign Up")}> Click Here</span></p> : <p>Already have an account? <span onClick={() => setCurrentState("Login")} >Login Here</span></p>
        }


      </form>
    </div>
  )
}

export default LoginPopup