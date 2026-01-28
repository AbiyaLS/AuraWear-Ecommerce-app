import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets"; 
import { toast } from "react-toastify";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = "₹"
    const delivery_fee = 50
    const [ search, setSearch ] = useState("")
    const [ showSearch, setShowSearch] = useState(false)
    const [ cartItems, setCartItems ] = useState({})

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
    
    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount
  
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider

