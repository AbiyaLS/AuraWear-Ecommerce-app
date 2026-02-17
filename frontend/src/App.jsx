import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Product from './pages/Product'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'

export default function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7pvw] lg:px-[9pvw]'>
      <ToastContainer/>
      <NavBar/>
      <SearchBar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/place-order' element={<PlaceOrder/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
