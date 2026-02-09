import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

export default function RelatedProducts({ categories,subCategories }) {
    const { products } = useContext(ShopContext)
    const [ related, setRelated ] = useState([])

    useEffect(()=>{

        if(products.length > 0 && categories && subCategories){
            let productCopy = products.slice()
            productCopy = productCopy.filter(item => categories === item.category)
            productCopy = productCopy.filter(item => subCategories === item.subCategory)

            setRelated(productCopy.slice(0,5))
        }

    },[products, categories,subCategories])
  return (
    <div className='mt-10'>
      <div className='text-center text-2xl mb-5'>
        <Title text1={"RELATED"} text2={"PRODUCTS"}/>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            related.map((item,index)=>(
                <ProductItem
                key={index._id}
                id={item._id}
                image={item.image?.[0]}
                name={item.name}
                price={item.price }
                />
            ))
        }

      </div>
    </div>
  )
}
