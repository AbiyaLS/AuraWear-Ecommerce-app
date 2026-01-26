import React from 'react'
import { assets } from '../assets/assets'

export default function Footer() {
  return (
    <div className='my-5 mx-5'>
      <div className='grid grid-cols-1 gap-10 text-center text-sm md:grid-cols-[3fr_1fr_1fr] md:gap-14 my-15 '>
        <div className='flex flex-col justify-center text-center items-center md:items-start'>
            <img className="w-32 mb-5 " src={assets.logo} alt="" />
            <p className='w-full md:w-3/4 text-gray-600  text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias assumenda eligendi deleniti nobis quas. Cumque natus sapiente eligendi magnam, reiciendis, ut impedit quis illum ipsa maxime debitis, repellendus excepturi ea.
            </p>
        </div>
        <div>
            <h1 className='text-base font-medium mb-4 md:text-lg'>COMPANY</h1>
             <ul className='flex flex-col gap-2 text-xs text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
             </ul>
        </div>
        <div>
            <h1 className="text-base font-medium mb-4 md:text-lg">GET IN TOUCH</h1>
            <p className="text-xs text-gray-400">+1-212-456-7890</p>
            <p className="text-xs text-gray-400">contact@aurawear.com</p>
        </div>
      </div>
       <div>
            <hr className='text-gray-400 my-5'/>
            <p className='text-xs text-gray-500 text-center'>Copyright 2024@ aurawear.com - All Right Reserved.</p>
        </div>
    </div>
  )
}
