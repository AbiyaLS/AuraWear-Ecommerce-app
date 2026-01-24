import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

export default function BestSeller() {
    const { products } = useContext(ShopContext)
    const [BestSeller, setBestSeller ] = useState([])

    useEffect(() => {
    const bestProducts = products.filter(item => item.bestSeller)
    setBestSeller(bestProducts.slice(0, 5))
}, [])
  return (
     <div className='my-10'>
           <div className='text-center mb-8 text-xl md:text-2xl lg:text-3xl'>
              <Title text1={"BEST"} text2={"SELLER"}/> 
              <p className='text-xs font-light '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus vel obcaecati harum dolore.</p>
           </div>
         {/* ----------Rendering Products-------- */}
         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
           {
               BestSeller.map((item,index)=>(
                   <ProductItem
                        key={item._id}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
               ))
           }
   
         </div>
       </div>
  )
}
