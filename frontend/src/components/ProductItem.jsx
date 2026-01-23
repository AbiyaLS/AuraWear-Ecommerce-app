import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

export default function ProductItem({ id,image,name,price }) {
    const { currency } = useContext(ShopContext)
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer bg-gray-200 rounded-lg'>
        <div className='overflow-hidden h-3/4 w-full'>
            <img src={image} alt="latest collection image" className='hover:scale-110 transition ease-in-out object-cover h-[360px] w-full rounded-lg'/>
        </div>
        <div className='pl-4'>
            <p className=' mt-2 text-md'>{name}</p>
            <p className='font-semibold'>{currency}
            <span>{price}</span>
        </p>
        </div>
        
    </Link>
  )
}
