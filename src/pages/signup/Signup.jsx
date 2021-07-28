import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../context/authContext'
import "./signup.css"


function Signup() {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const { user, createUserWithCredentials } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
      user && navigate("/", { replace : true })
    }, [])
    const handleSignup = async () => {
      const { message, success } = await createUserWithCredentials(
        name,
        email, 
        password
      )
      if(success){
        navigate(state?.from ? state?.from : "/", { replace : true })
      }else{
        setError(message)
      }
    }
  
    return (
        <div className="signup">
      <div className="signupWrapper">
        <div className="signupLeft">
          <h3 className="signupLogo">Crickart</h3>
        </div>
        <div className="signupRight">
          <div className="signupBox">
            {error && (
            <p className="errorMessage" style={{ color: "red" }}>
              {error}
            </p>
          )}
            <input 
            placeholder="Username" 
            className="signupInput" 
            type="text"
            onChange={(e) => setName(e.target.value)}
            />

            <input 
            placeholder="abc@gmail.com" 
            className="signupInput" 
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            />

            <input 
            placeholder="Password" 
            className="signupInput" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />

            <button 
            className="signupButton"
            onClick={handleSignup}
            >
                Sign Up
            </button>

            <button 
            className="signupRegisterButton"
            onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Signup
