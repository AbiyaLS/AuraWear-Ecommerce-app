import React, { useState,useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function Login() {
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext)
  const [ currentState, setCurrentState ] = useState('Login')
  const [ name,setName ] = useState("")
  const [ email,setEmail ] = useState("")
  const [ password,setPassword ] = useState("")
  
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if(currentState === "Sign Up"){
        const response = await axios.post(`${backendUrl}api/user/register`, { name,email,password })
        toast.success(response.data.message)
        if(response.status === 200){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          
        }

      }else{
        const response = await axios.post(`${backendUrl}api/user/login`,{ email, password })
        toast.success(response.data.message)
        if(response.status === 200){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          
        }
      }
      setName('')
      setEmail('')
      setPassword('')

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }
   
  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className=' flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-2 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='w-10 bg-gray-800 h-[1.5px] border-none'/>
      </div>
      { currentState === "Login" ? " " : <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full border py-1.5 px-3 border-gray-800' placeholder='Name' type="text" required/>}
      <input className='w-full border py-1.5 px-3 border-gray-800' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' type="email" required/>
      <input className='w-full border py-1.5 px-3 border-gray-800 ' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' type="password" required/>
      <div className='w-full flex justify-between text-sm text-gray-600'>
        <p className='cursor-pointer'>Forgot Your Password?</p>
        { currentState === "Login" ? <p className='cursor-pointer' onClick={()=>setCurrentState("Sign Up")}>Create account</p> : <p className='cursor-pointer' onClick={()=>setCurrentState("Login")}>Login Here</p>}
      </div>
      <button type='submit' className='bg-black text-white py-1.5 px-8 mt-4 border border-gray-950 cursor-pointer hover:border-white'>{ currentState === "Sign Up" ? "Login" : "Sign Up"}</button>
    </form>
  )
}
