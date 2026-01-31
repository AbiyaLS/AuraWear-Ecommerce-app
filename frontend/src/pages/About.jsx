import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

export default function About() {
  return (
    <div>
      <div className='text-3xl text-center pt-8'>
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full  md:max-w-[450px]' src={assets.about} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 text-justify '>
        <p>AuraWear is a contemporary fashion eCommerce app designed for individuals who express themselves through style. Blending modern trends with timeless aesthetics, AuraWear offers a carefully curated collection of apparel and accessories for everyday wear, work, and special moments. The app delivers a seamless shopping experience with intuitive navigation, personalized recommendations, and high-quality visuals that make discovering fashion effortless and enjoyable.</p>
        <p>More than just shopping, AuraWear is about confidence and identity. Every piece is selected to help users elevate their personal aura—whether bold, minimal, or effortlessly chic. With secure payments, fast checkout, and reliable delivery, AuraWear turns fashion inspiration into reality, empowering users to look good, feel confident, and wear their vibe wherever they go.</p>
        <h3 className='font-bold text-lg'>Our Mission</h3>
        <p>At AuraWear, our mission is to empower individuals to express their true selves through fashion. We aim to make style accessible, inspiring, and effortless by offering thoughtfully curated collections that balance quality, comfort, and modern design. AuraWear is committed to helping every customer feel confident in what they wear, no matter the occasion.</p>
        <p>We believe fashion is more than clothing—it’s a form of self-expression. That’s why we strive to create an inclusive platform that celebrates individuality, embraces evolving trends, and delivers a seamless shopping experience built on trust, innovation, and style.</p>
        </div>
      </div>
      <div className='text-lg'>
          <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border border-gray-300 px-10 md:px-16 sm:py-10 flex flex-col gap-5'>
            <b>Quality Assurance</b>
            <p className='text-gray-700 text-justify'>AuraWear ensures every product meets high standards of quality, comfort, and durability through careful selection and trusted sourcing, so customers can shop with confidence.</p>
          </div>
           <div className='border border-gray-300 px-10 md:px-16 sm:py-10 flex flex-col gap-5'>
            <b>Convenience</b>
            <p className='text-gray-700 text-justify'>AuraWear offers a smooth and effortless shopping experience with easy navigation, secure payments, and fast checkout, making fashion accessible anytime, anywhere.</p>
          </div>
           <div className='border border-gray-300 px-10 md:px-16 sm:py-10 flex flex-col gap-5'>
            <b>Exceptional Customer Service</b>
            <p className='text-gray-700 text-justify'>AuraWear is dedicated to providing responsive and reliable customer support, ensuring every shopper receives timely assistance and a smooth, satisfying experience.</p>
          </div>
        </div>
      <NewsLetterBox/>
    </div>
  )
}
