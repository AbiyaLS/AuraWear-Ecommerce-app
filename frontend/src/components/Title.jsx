import React from 'react'

export default function Title({ text1, text2 }) {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
      <p className='text-gray-400 flex gap-1'>{text1}
        <span className='text-gray-700 font-semibold'>{text2}</span>
      </p>
      <p className='w-10 sm:h-[2px]  bg-gray-800'></p>
    </div>
  )
}
