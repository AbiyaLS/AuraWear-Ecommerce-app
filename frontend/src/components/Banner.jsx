import React from 'react'
import { assets } from '../assets/assets.js'

export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row items-center w-full h-[70vh] overflow-hidden mt-2 border">
      
      {/* LEFT IMAGE */}
      <div className="w-full md:w-1/2 h-full">
        <img
          src={assets.banner_img}
          alt="Latest Arrivals"
          className="w-full min-h-screen object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-20 text-black">
        
        <div className="flex items-center gap-4 mb-4">
          <span className="w-12 h-[1px] bg-black"></span>
          <p className=" tracking-widest text-sm font-semibold ">
            OUR BESTSELLER
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif mb-6 prata-regular">
          LATEST ARRIVALS
        </h1>

        <div className="flex items-center gap-4">
          <p className="tracking-widest text-sm font-semibold">
            SHOP NOW
          </p>
          <span className="w-12 h-[1px] bg-black"></span>
        </div>

      </div>
    </div>
  )
}
