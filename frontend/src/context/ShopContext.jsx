import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = "₹"
    const delivery_fee = 50
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const [ search, setSearch ] = useState("")
    const [ showSearch, setShowSearch] = useState(false)
    const [ cartItems, setCartItems ] = useState({})
    const [ products, setProducts ] = useState([])
    const [ token, setToken ] = useState("")
    const navigate = useNavigate()

    // ------------Product add to cart only by selecting size--------
    const addToCart = async ( itemId, size ) => {
        let cartData = structuredClone(cartItems)

        if(!size){
            toast.error("Select Product Size")
            return 
        }
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0

        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size]
            }
        }

        return totalCount
    }

    const updateQuantity = async (itemId,size,quantity) => {
        const cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
    }
    // ------total amount of cart item ----------------
   const getCartAmount = () => {
    let totalAmount = 0

    for (const itemId in cartItems) {
        const itemInfo = products.find(
            product => product._id === itemId
        )

        if (!itemInfo) continue

        for (const size in cartItems[itemId]) {
            const quantity = cartItems[itemId][size]
            if (quantity > 0) {
                totalAmount += itemInfo.price * quantity
            }
        }
    }
    return totalAmount
}

// -------------------get products data from backend---------
    const getProductsdata = async () => {
        try {
            const response = await axios.get(`${backendUrl}api/product/list`) 
            if(response.status === 200){
                setProducts(response.data)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(()=> {
        getProductsdata()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }

    },[])



    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount, updateQuantity,getCartAmount,
        navigate,
        backendUrl,
        token, setToken
  
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider

