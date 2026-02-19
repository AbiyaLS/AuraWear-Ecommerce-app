import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

export default function Login({ setToken }) {
    const [ email,setEmail ] = useState("")
    const [ password,setPassword ] = useState("")
    
const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(backendUrl + 'api/user/admin',{email,password})  
      console.log(response)
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("adminToken", response.data.token);
      } else{
        toast.error(response.data.message)
      }
    } catch (error) {
        console.log(error)
        toast.error("Login Failed")
    }
}

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <div className='bg-gray-50 shadow-lg shadow-gray-400 rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl md:text-3xl mb-4 font-semibold text-pink-950 text-center'>Admin Panel</h1>
        <form onSubmit={ onSubmitHandler }>
            <div className='mb-3 min-w-72'>
                <p className='mb-2 text-gray-700'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-gray-400 px-4 py-1.5 outline-none rounded-md w-full ' type="email" placeholder='your@gmail.com' required/>
            </div>
            <div className='mb-3 min-w-72'>
                <p className='mb-2 text-gray-700'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-gray-400 px-4 py-1.5 outline-none rounded-md w-full' type="password" placeholder='Enter Your Password' required/>
            </div>
            <button className='w-full bg-pink-950 text-white rounded-lg py-2 mt-2 hover:bg-black ' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}
