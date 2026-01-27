import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets.js"
import { Link, NavLink } from 'react-router-dom'
import {  ChevronRight, Handbag, Menu, Search, User } from "lucide-react"
import { ShopContext } from '../context/ShopContext.jsx'

export default function NavBar() {
    const [ visible,setVisible ] = useState(false)
    const { setShowSearch } = useContext(ShopContext)

    
  return (
    <div className='flex justify-between items-center font-medium'>
      <Link to="/"><img src={assets.logo} className="w-30" alt="logo" /></Link>
      {/* ------------------Middle section------------------- */}
      <ul className='hidden sm:flex gap-5 text-xs text-gray-600 '>
        <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>
      {/* ---------------------------last section----------------------------- */}
      <div className='flex gap-4 text-gray-700 cursor-pointer'>
        <Search size={30} onClick={()=>setShowSearch(true)}/>
        <div className='group relative'>
            <User size={30}/>
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-30 p-2 rounded-md bg-gray-100 text-gray-500 text-sm'>
                    <p className='cursor-pointer hover:text-gray-800'>My Profile</p>
                    <p className='cursor-pointer hover:text-gray-800'>Orders</p>
                    <p className='cursor-pointer hover:text-gray-800'>Logout</p>
                </div>

            </div>
        </div>
        <Link to="/cart" className='relative'>
            <Handbag size={30}/>
            <p className='absolute right-[-5px] bottom-[-5px] text-center w-3 leading-3 bg-black text-white rounded-full aspect-square text-[8px] p-[2px]'>10</p>
        </Link>
        <div onClick={()=>setVisible(true)} className='cursor-pointer sm:hidden'>
            <Menu size={30}/>
         </div>
         {/* -----------Sidebar menu for smaller screen ------------------- */}
         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-500 text-sm pt-4 '>
                <div onClick={()=>setVisible(false)} className='flex gap-4  items-center mb-4 ml-2'>
                    <span className='h-4 rotate-180'>
                        <ChevronRight size={30}/>
                    </span>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-gray-300 border-[0.5px]' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-gray-300 border-[0.5px]' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-gray-300 border-[0.5px]' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-gray-300 border-[0.5px]' to='/contact'>CONTACT</NavLink>
            </div>
         </div>
      </div>
    </div>
  ) 
}
