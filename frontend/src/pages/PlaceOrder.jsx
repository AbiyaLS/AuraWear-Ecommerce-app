import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

export default function PlaceOrder() {
  const { navigate } = useContext(ShopContext)
  const [ payMethod, setPayMethod ] = useState("cod")
  const [ formData, setFormData ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

  }

  const inputField = 'border border-gray-400 py-1.5 px-3 w-full'
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ----------left side ------- */}
      <div className='flex flex-col gap-4'>
        <div className='text-2xl '>
          <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        <div className='flex gap-5 mt-4'>
          <input type="text" placeholder='First name' className={inputField}/>
          <input type="text" placeholder='Last name' className={inputField}/>
        </div>
        <input className={inputField} type="email" placeholder='Email address' />
        <input className={inputField} type="text" placeholder='Street' />
        <div className='flex gap-5 '>
          <input type="text" placeholder='City' className={inputField}/>
          <input type="text" placeholder='State' className={inputField}/>
        </div>
        <div className='flex gap-5 '>
          <input type="number" placeholder='Zipcode' className={inputField}/>
          <input type="text" placeholder='Country' className={inputField}/>
        </div>
        <input className={inputField} type="number" placeholder='Street' />
      </div>
      {/* --------------------------Right Side----------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
          <div className='mt-6'>
            <div className='text-xl mb-2'>
              <Title text1={"PAYMENT"} text2={"METHOD"}/>
            </div>
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={()=>setPayMethod("stripe")} className='flex items-center cursor-pointer border py-1.5 px-4 border-gray-500'>
                <p className={`min-w-3.5 h-3.5 rounded-full border hover:border-green-400 ${payMethod === "stripe" ? "bg-green-400" : ""}`}> </p>
                <img className="h-10 mx-2" src={assets.stripe} alt="stripe icon" />
              </div>
               <div onClick={()=>setPayMethod("razorpay")} className='flex items-center cursor-pointer border py-1.5 px-4 border-gray-500'>
                <p className={`min-w-3.5 h-3.5 rounded-full border hover:border-green-400 ${payMethod === "razorpay" ? "bg-green-400" : ""}`}> </p>
                <img className="h-10 w-20 mx-2" src={assets.razorpay} alt="razorpay icon" />
              </div>
               <div onClick={()=>setPayMethod("cod")} className='flex items-center cursor-pointer border py-1.5 px-4 border-gray-500'>
                <p className={`min-w-3.5 h-3.5 rounded-full border hover:border-green-400 ${payMethod === "cod" ? "bg-green-400" : ""}`}> </p>
                <p className="mx-2 text-gray-500">Cash on Delivery</p>
              </div>
            </div>
            <div className='w-full text-end my-5'>
              <button onClick={()=>navigate("/orders")} className='bg-black text-white px-12 py-2'>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
