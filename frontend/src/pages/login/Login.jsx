import React, { useContext, useState } from 'react'
import "./login.css"
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    password: undefined
  })
  const {loading, error, dispatch, user} = useContext(AuthContext)
  const navigate = useNavigate();
  function handleChange(e){
    setCredentials( prev => ({
        ...prev, [e.target.id]: e.target.value
    }))
  }
  console.log(credentials)
  async function click(e){
    e.preventDefault()
    dispatch({type: "AUTH_LOGIN_Start"})
    try{
        const response = await axios.post("http://localhost:9000/api/auth/login", credentials, {withCredentials: true})
        console.log(response.data.details)
        dispatch({type: "AUTH_LOGIN_Success", payload: response.data.details})
        navigate("/")
    }
    catch(err){
        dispatch({type: "AUTH_LOGIN_Failed", payload: err})
    }
  }

  console.log(`user is ${user}`)
  return (
    <div className='login'>
        <div className='lContainer'>
            <h1>Login page</h1>
            <input className="lInput" type="text" id='userName' placeholder='userName' onChange={handleChange} />
            <input className="lInput" type='password' id='password' placeholder='password' onChange={handleChange} />
            <button disabled={loading} className='lButton' onClick={click}>Login</button>
        </div>
        {error && <span>{error.message}</span>}
    </div>
    
  )
}

export default Login