import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

export default function Contact() {
  return (
    <div>
      <div className='text-3xl text-center pt-8'>
        <Title text1={"CONTACT"} text2={"US"}/>
       </div>
       <div className='mt-10 mb-25 flex flex-col md:flex-row gap-16 justify-center'>
        <img className='w-full h-[600px] md:max-w-[500px]' src={assets.contact} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-justify '>
          <h3 className='text-lg font-semibold text-black'>Our Store</h3>
         <div>
          <p>3rd Floor, Sapphire Towers MG Road, Indiranagar</p>
          <p>Bengaluru, Karnataka, India</p>
        </div> 
          <div>
          <p>Tel: +91 7895674592</p>
          <p>Email: aurawaer@gmail.com</p>
          </div>
          <h3 className='text-lg font-semibold text-black'>Career at AuraWear</h3>
          <p>Learn more about our team and job opening</p>
          <button className='border border-gray-600 px-4 py-4 max-w-[200px] cursor-pointer hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}
