import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

export default function CartTotal() {
    const { currency, delivery_fee, getCartAmount} = useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl my-2'>
        <Title text1={"Total"} text2={"Amount"}/>
      </div>
      <div className='flex flex-col gap-2 text-gray-800'>
        <div className='flex justify-between'>
            <p>SubTotal</p>
            <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p className='text-lg '>Total</p>
            <p className='text-lg font-medium'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
        </div>

      </div>
    </div>
  )
}
