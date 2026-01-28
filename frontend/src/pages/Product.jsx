import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Star } from 'lucide-react'
import RelatedProducts from '../components/RelatedProducts'

export default function Product() {
  const { productId } = useParams()
  const { products,currency } = useContext(ShopContext)
  const [ productData, setProductData ] = useState(false)
  const [ image, setImage ] = useState("")
  const [ size, setSize ] = useState("")

  // --------------Fetch Products-------------
  const fetchProductsData = async () => {
    products.map((item)=>{
      if( item._id === productId ){
        setProductData(item)
        setImage(item.image[0])
      
        return null
      }
    })

  }

  useEffect(()=>{
    fetchProductsData()
  },[productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* -----------Product Data---------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* --------product Image------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row sm:gap-2'>
          <div className='flex sm:flex-col justify-normal overflow-x-auto sm:overflow-y-scroll '>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)}
                className="max-w-[150px] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" src={item} key={index} alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img  className="w-full " src={image} alt="" />
          </div>
        </div>
        {/* -------------Product Information--------- */}
        <div className='flex-1'>
          <h1 className='text-lg font-semibold mb-2'>{productData.name }</h1>
          <div className='flex items-center mb-1'>
            <Star className='fill-orange-600 text-orange-500 ' size={20}/>
            <Star className='fill-orange-600 text-orange-500 ' size={20}/>
            <Star className='fill-orange-600 text-orange-500 ' size={20}/>
            <Star className='fill-orange-600 text-orange-500 ' size={20}/>
            <Star className='fill-orange-200 text-orange-200 ' size={20}/>
            <p className='ml-2 text-gray-500 text-xs'>(122)</p>
          </div>
          <h2 className='text-lg font-medium'>{currency}{productData.price}</h2>
          <p className='text-xs text-gray-500 my-2'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-4'>
            <p className='mt-2 text-sm'>Select size</p>
             <div className='flex gap-2'>
              {productData.size.map((item, index)=>(
                <button onClick={()=>setSize(item)} key={index} className={`${item === size ? "border-gray-800" : "border-gray-200"} border bg-gray-200 py-1 px-4 rounded-sm text-gray-600 cursor-pointer`}>
                  {item}
                  </button>
              ))}
             </div>
          </div>
          <button className='bg-gray-900 text-white px-4 text-xs py-2 mb-8 active:bg-gray-700'>ADD TO CART</button>
          <hr className='text-gray-400' />
          <div className='text-xs text-gray-500 mt-4'>
            <p>100% Orginal Product.</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
         </div>
       </div> 
         {/*---------------Description and Review----------------  */}
         <div className='mt-20 '>
          <div className='flex'>
            <b className='border px-5 py-2 text-sm'>Description</b>
            <p className='border px-5 py-2 text-sm'>Review (122)</p>
          </div>
          <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border border-gray-400'>
            <p className='text-justify'>An Ecommerce website is an online platform that facilitates the buying and selling of products or services over the internet. It services as a virtual marketplace where businesses and individuals can showcase there products, interact with customers, and contact  transaction without the need for a physical presence. E-commerce website have gained immense popularity due to their convience, accessibility and the global reach they offer.</p>
            <p className='text-justify'>E-commerce website typically display products or services along with detailed description, image, prices and any available variations (e.g.,sizes, colours). Each product usually has its own dedicated page with relevent information</p>
            </div>
         </div>
         {/* ---------------Dispaly related products------------------ */}
         <RelatedProducts categories={productData.category} subCategories={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'>

  </div>
}
 