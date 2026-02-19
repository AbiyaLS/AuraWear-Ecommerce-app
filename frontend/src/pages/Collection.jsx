import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { ChevronRight } from 'lucide-react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const ITEMS_PER_PAGE = 12;

export default function Collection() {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [sortType, setSortType] = useState("relavant")
  const [currentPage, setCurrentPage] = useState(1)

  // --------------On Change for categories------------
  const toggleCategories = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategories(prev => [...prev, e.target.value])
    }
  }

  // --------------On Change for Sub categories------------
  const toggleSubCategories = (e) => {
    if (subCategories.includes(e.target.value)) {
      setSubCategories(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategories(prev => [...prev, e.target.value])
    }
  }

  // ----------------Apply filter in both-------------
  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (categories.length > 0) {
      productsCopy = productsCopy.filter(item => categories.includes(item.category))
    }

    if (subCategories.length > 0) {
      productsCopy = productsCopy.filter(item => subCategories.includes(item.subCategory))
    }

    // 🔁 Latest products first
    productsCopy.reverse()

    setFilterProducts(productsCopy)
    setCurrentPage(1) // reset page when filter changes
  }

  // -------------------Sort Products----------------
  const sortProducts = () => {
    let filterCopy = filterProducts.slice()

    switch (sortType) {
      case 'high-low':
        setFilterProducts(filterCopy.sort((a, b) => b.price - a.price))
        break
      case 'low-high':
        setFilterProducts(filterCopy.sort((a, b) => a.price - b.price))
        break
      default:
        applyFilter()
        break
    }

    setCurrentPage(1) // reset page when sort changes
  }

  useEffect(() => {
    applyFilter()
  }, [categories, subCategories, search, showSearch, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  // ---------------- Pagination Logic ----------------
  const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filterProducts.slice(startIndex, endIndex)

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* -------Filter Option---------------- */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='flex items-center font-medium cursor-pointer text-xl'
        >
          FILTER
          <ChevronRight
            className={`sm:hidden text-gray-400 ${showFilter ? 'rotate-90' : ""}`}
          />
        </p>

        {/* -----------Category Filter---------- */}
        <div className={`sm:block ${showFilter ? "" : "hidden"} border border-gray-400 pl-3 py-2 pr-20 my-4`}>
          <p className='text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-xs mt-2 text-gray-600'>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Men"} onChange={toggleCategories} /> MEN
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Women"} onChange={toggleCategories} /> WOMEN
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Kids"} onChange={toggleCategories} /> KIDS
            </p>
          </div>
        </div>

        {/* --------------SubCategory filter----------- */}
        <div className={`sm:block ${showFilter ? "" : "hidden"} border border-gray-400 pl-3 py-2 pr-20 my-4`}>
          <p className='text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-xs mt-2 text-gray-600'>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Topwear"} onChange={toggleSubCategories} /> TOPWEAR
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Bottomwear"} onChange={toggleSubCategories} /> BOTTOMWEAR
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Winterwear"} onChange={toggleSubCategories} /> WINTERWEAR
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Dresses"} onChange={toggleSubCategories} /> DRESSES
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={"Sets"} onChange={toggleSubCategories} /> SETS
            </p>
          </div>
        </div>
      </div>

      {/* ---------------Right Side-------------- */}
      <div className='flex-1'>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4'>
          <Title text1={"ALL"} text2={"COLLECTION"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='w-50 sm:w-auto border-2 border-gray-300 px-2 py-1 text-sm text-gray-600'
          >
            <option value="relavant">Sort by: Relevant</option>
            <option value="high-low">Sort by: High to Low</option>
            <option value="low-high">Sort by: Low to High</option>
          </select>
        </div>

        {/* -----------Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {currentProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {/* -----------Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border hover:rounded-lg ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border hover:rounded-lg ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
