import React from 'react'

export default function NewsLetterBox() {

    const handleSubmit =(e)=>{
        e.preventDefault()
    }

  return (
    <div className='text-center '>
      <p className='font-semibold text-xl mb-2'>Subscribe now & get 20% off</p>
      <p className='text-xs text-gray-400'>Lorem ipsum dolor, minus magnam quibusdam aliquid praesentium non.</p>
      <form onSubmit={handleSubmit}
      className='my-5 flex flex-col sm:flex-row items-stretch justify-center max-w-md mx-auto'>
        <input className='border border-gray-300 px-4 h-10 text-sm outline-none sm:flex-1 rounded-md sm:rounded-r-none' type="email" placeholder='Enter you email' />
        <button className='bg-black text-white px-6 h-10 text-sm mt-3 sm:mt-0 sm:rounded-l-none rounded-md hover:bg-gray-800 transition'>Subscribe</button>
      </form>
    </div>
  )
}
