import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

export default function Orders() {
  const { currency, products } = useContext(ShopContext)
  return (
    <div className='mt-10'>
      <div className='text-xl'>
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>
      <div>
        {
          products.slice(1,4).map((item,index)=>(
            <div key={index} className='border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-gray-400'>
              <div className='flex items-start gap-6'>
                <img src={item.image[0]} alt="" className='w-16 sm:w-20'/>
                <div className='flex-col gap-2'>
                    <p className='text-md font-medium sm:text-lg mb-2'>
                      {item.name}
                    </p>
                    <div className='flex gap-4 text-gray-700 text-sm items-center'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity: 1</p>
                      <p className=''>Size: M</p>
                    </div>
                    <p className='text-sm'>Date: <span className='text-sm text-gray-600'>24-June-2025</span></p>
                    <p className='text-sm'>Payment: <span className='text-sm text-gray-600'>COD</span></p>
                  </div>
              </div>
              {/* ----------middle -------- */}
              <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2 '>
                <p className='border border-green-400 bg-green-400 w-3 h-3 rounded-full'></p>
                <p className='text-sm text-gray-700'>Order Placed</p>
              </div>
              <button className='text-sm text-gray-700 border border-gray-400 p-2'>Track Orders</button>
              </div>

            </div>
          ))
        }
      </div>
      
    </div>
  )
}
