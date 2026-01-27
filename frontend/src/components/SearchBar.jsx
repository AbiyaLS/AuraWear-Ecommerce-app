import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Search, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function SearchBar() {
    const { search,setSearch,showSearch,setShowSearch } = useContext(ShopContext)
    const [ visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(()=>{
       if(location.pathname.includes("collection")){
        setVisible(true)
       } else{
        setVisible(false)
       }
      
    },[location])

  return showSearch && visible ? (
    <div className=' bg-gray-50  text-center py-4 flex justify-center items-center gap-2'>
      <div className='inline-flex items-center justify-center border border-gray-500 rounded-4xl px-5 py-1 w-1/2 sm:w-1/2'>
      <input className='flex-1 outline-none bg-inherit text-sm ' value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' />
      <Search className='text-gray-600'/>
      </div>
      <X onClick={()=>setShowSearch(false)} className='inline cursor-pointer text-gray-600'/>
    </div>
  ) : null
}
