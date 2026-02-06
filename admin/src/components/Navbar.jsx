import React from 'react'
import logo from "../assets/logo.png"

export default function Navbar() {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
      <img src={logo} className='w-30' alt="logo" />
      <button className='border border-pink-800 rounded-2xl px-6 py-2 text-sm bg-gray-700 text-white font-semibold '>Logout</button>
    </div>
  )
}
