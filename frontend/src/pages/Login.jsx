import React, { useState } from 'react'

export default function Login() {
  const [ currentState, setCurrentState ] = useState('Login')
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()

  }

  return (
    <form onSubmit={onSubmitHandler} className=' flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-2 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='w-10 bg-gray-800 h-[1.5px] border-none'/>
      </div>
      { currentState === "Login" ? " " : <input className='w-full border py-1.5 px-3 border-gray-800' placeholder='Name' type="text" required/>}
      <input className='w-full border py-1.5 px-3 border-gray-800' placeholder='Email' type="email" required/>
      <input className='w-full border py-1.5 px-3 border-gray-800 ' placeholder='Password' type="password" required/>
      <div className='w-full flex justify-between text-sm text-gray-600'>
        <p className='cursor-pointer'>Forgot Your Password?</p>
        { currentState === "Login" ? <p className='cursor-pointer' onClick={()=>setCurrentState("Sign Up")}>Create account</p> : <p className='cursor-pointer' onClick={()=>setCurrentState("Login")}>Login Here</p>}
      </div>
      <button type='submit' className='bg-black text-white py-1.5 px-8 mt-4'>{ currentState === "Login" ? "Sign Up" : "Login"}</button>
    </form>
  )
}
