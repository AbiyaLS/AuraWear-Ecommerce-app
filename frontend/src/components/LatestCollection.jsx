import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

export default function LatestCollection() {
    const { products }  = useContext(ShopContext)
    const [ latestProducts, setLatestProducts] = useState([])

    useEffect(()=>{
        setLatestProducts(products.slice(0,10))
    },[])
    console.log(products)

  return (
    <div className='my-54 md:my-45 lg:my-10'>
        <div className='text-center mb-8 text-xl md:text-2xl lg:text-3xl'>
           <Title text1={"LATEST"} text2={"COLLECTION"}/> 
           <p className='text-xs font-light '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus vel obcaecati harum dolore.</p>
        </div>
      {/* ----------Rendering Products-------- */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductItem 
                    key={index} 
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
