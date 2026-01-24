import React from 'react'
import { assets } from '../assets/assets'

export default function OurPolicy() {
  return (
    <div className='my-12 md:my-16 flex flex-col md:flex-row justify-center items-center md:gap-12 gap-6'>
      <div className='flex flex-col justify-center items-center'>
        <img  className='w-10 m-auto mb-2' src={assets.policy1} alt="" />
        <p className='font-medium text-sm'>Easy Exchange Policy</p>
        <p className='text-gray-400 text-xs'>We offer hassle free xchange policy</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <img  className='w-10 m-auto mb-2' src={assets.policy2} alt="" />
        <p className='font-medium text-sm'>7 days return policy</p>
        <p className='text-gray-400 text-xs'>we provide 7 days free return policy</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <img  className='w-10 m-auto mb-2' src={assets.policy3} alt="" />
        <p className='font-medium text-sm'>Best Customer Support</p>
        <p className='text-gray-400 text-xs'>We provide 24/7 customer service</p>
      </div>
    </div>
  )
}
