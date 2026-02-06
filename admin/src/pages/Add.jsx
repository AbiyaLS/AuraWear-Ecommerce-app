import React from 'react'
import upload from "../assets/upload.png"

export default function Add() {
  return (
    <form className='flex flex-col w-full item-start justify-start text-sm gap-2'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-4'>
        <label htmlFor="image1" className=''>
          <img src={upload} className='w-20' alt="" />
          <input type="file" id="image1" hidden/>
        </label>
        <label htmlFor="image2" className=''>
          <img src={upload} className='w-20' alt="" />
          <input type="file" id="imag2" hidden/>
        </label>
        <label htmlFor="image3" className=''>
          <img src={upload} className='w-20' alt="" />
          <input type="file" id="image3" hidden/>
        </label>
        <label htmlFor="image4" className=''>
          <img src={upload} className='w-20' alt="" />
          <input type="file" id="image4" hidden/>
        </label>
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Name</p>
        <input type="text" placeholder='Type Here...'  className='w-full max-w-[500px] border border-gray-400 py-2 px-4 rounded-md' required/>
      </div>
      <div>
        <p className='mb-2'>Product Description</p>
        <textarea name="description" required placeholder='Write Content Here...' className='w-full max-w-[500px] border border-gray-400 py-2 px-4 rounded-md'/>
      </div>
      <div className='flex flex-col sm:flex-row w-full sm:gap-8 gap-5'>
        <div>
          <p className='mb-1'>Product Category</p>
          <select className='w-full max-w-[250px] border border-gray-400 py-2 px-2 rounded-md'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
         <div>
           <p className='mb-1'>Sub Category</p>
          <select className='w-full max-w-[250px] border border-gray-400 py-2 px-2 rounded-md'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Dresses">Dresses</option>
            <option value="Sets">Sets</option>
          </select>
        </div>
         <div>
          <p className='mb-1'>Product Price</p>
          <input type="text" placeholder='₹324' className='w-full max-w-[200px] border border-gray-400 py-2 px-4 rounded-md'/>
        </div>
      </div>
      <div>
        <p className='mb-2'>Sizes</p>
        <div className='flex gap-4'>
          <span className='border px-3 py-1 bg-gray-200 border-gray-200 text-sm font-semibold rounded-md hover:border-[#C586A5]'>S</span>
          <span className='border px-3 py-1 bg-gray-200 border-gray-200 text-sm font-semibold rounded-md hover:border-[#C586A5]'>M</span>
          <span className='border px-3 py-1 bg-gray-200 border-gray-200 text-sm font-semibold rounded-md hover:border-[#C586A5]'>L</span>
          <span className='border px-3 py-1 bg-gray-200 border-gray-200 text-sm font-semibold rounded-md hover:border-[#C586A5]'>XL</span>
          <span className='border px-3 py-1 bg-gray-200 border-gray-200 text-sm font-semibold rounded-md hover:border-[#C586A5]'>XXL</span>
        </div>
      </div>
      <div className='flex gap-4 mt-2'>
        <input type="checkbox" id='bestseller' className=''/>
        <label htmlFor='bestseller'>Add to bestseller</label>
      </div>
      <button type='submit' className='bg-black text-white py-2 w-30'>Add</button>
    </form>
  )
}
