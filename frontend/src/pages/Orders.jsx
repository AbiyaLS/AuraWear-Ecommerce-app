import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

export default function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [ orderData, setOrderData ] = useState([])

  const loadOrderData = async () => {
    try {
      if(!token){
        return null
      }
      const response = await axios.post(`${backendUrl}api/order/userorders`,{}, {headers:{token}})
      // console.log(response.data)
      if(response.status === 200){
        let allOrdersItems =[]
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status']  = order.status
            item['payment']  = order.payment
            item['paymentMethod']  = order.paymentMethod
            item['date']  = order.date
            allOrdersItems.push(item)
          })
        })
        setOrderData(allOrdersItems.reverse())
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    loadOrderData()

  },[token])
  return (
    <div className='mt-10'>
      <div className='text-xl'>
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>
      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className='border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-gray-400'>
              <div className='flex items-start gap-6'>
                <img src={item.image[0]} alt="" className='w-16 sm:w-20'/>
                <div className='flex-col gap-2'>
                    <p className='text-md font-medium sm:text-lg mb-2'>
                      {item.name}
                    </p>
                    <div className='flex gap-4 text-gray-700 text-sm items-center'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p className=''>Size: {item.size}</p>
                    </div>
                    <p className='text-sm'>Date: <span className='text-sm text-gray-600'>{new Date(item.date).toDateString()}</span></p>
                    <p className='text-sm'>Payment: <span className='text-sm text-gray-600'>{item.paymentMethod}</span></p>
                  </div>
              </div>
              {/* ----------middle -------- */}
              <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2 '>
                <p className='border border-green-400 bg-green-400 w-3 h-3 rounded-full'></p>
                <p className='text-sm text-gray-700'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='text-sm text-gray-700 border border-gray-400 p-2'>Track Orders</button>
              </div>

            </div>
          ))
        }
      </div>
      
    </div>
  )
}
