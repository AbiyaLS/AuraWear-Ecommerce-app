import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

export default function List( { token }) {

  const [ list,setList ] = useState([])
// ------------------------Get Products ------------------------
  const fetchListProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/product/list`)
      if(response.status === 200){
        setList(response.data)
      }
      else{
        toast.error(response.data.message)
      }
      // console.log(response)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
// ----------------------delete product--------------------
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}api/product/remove`, {
        data: {id},
        headers : { token }
      })
      console.log(response)
      if(response.status === 200){
        toast.success(response.data.message)
        await fetchListProducts()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
   }
  

  useEffect(()=>{
    fetchListProducts()
  },[])
  return (
    <div>
      <p className='mb-5 font-semibold text-lg'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* -----List Table title----- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm border-gray-300 '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* ------------------List Products---------- */}
        {
          list.map((item,index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 border border-gray-300 px-2 text-sm'>
              <img className='w-12' src={item.image[0]} alt="first image of product" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => deleteProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg font-semibold'>X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
