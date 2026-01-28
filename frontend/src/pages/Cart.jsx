import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { Trash2 } from 'lucide-react'

export default function Cart() {
  const { products, currency, cartItems } = useContext(ShopContext)
  const [ cartData, setCartData ] = useState([])

  useEffect(()=>{
    const tempData = []
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  },[cartItems])

  return (
    <div className='mt-10'>
      <div className='text-xl mb-6'>
        <Title text1={"YOUR"} text2={"CART"} /> 
      </div>

      <div className='flex flex-col gap-4'>
        {
          cartData.map((item,index) => {
            const productData = products.find(
              (product) => product._id === item._id
            )
            if(!productData) return null

            return(
              <div
                key={index}
                className='grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 border-t border-b py-4'
              >
                {/* Image + product info */}
                <div className='flex gap-4 items-start'>
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt="Cart product image"
                  />

                  <div>
                    <p className='text-md font-medium sm:text-lg mb-2'>
                      {productData.name}
                    </p>

                    <div className='flex gap-4 text-gray-700 text-sm items-center'>
                      <p>{currency}{productData.price}</p>
                      <p className='border px-2 py-1 bg-gray-100 rounded-sm'>
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <input
                  className='border w-12 sm:w-16 px-1 border-gray-300 text-center'
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />

                {/* Delete icon */}
                <div className='flex justify-center text-gray-500 hover:text-red-600 cursor-pointer'>
                  <Trash2 size={25} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
