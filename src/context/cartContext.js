import React  from "react"
import { createContext, useContext,useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}){
    const [itemsInCart , setItemsInCart] = useState([])
    const [wishList,setWishList] = useState([])
    const [products,setProducts] = useState([])
    const [cart, setCart] = useState(false)

 
    return (
        <>
        <CartContext.Provider 
        value={{
            itemsInCart,
            setItemsInCart,
            products,
            wishList,
            setWishList,
            setProducts,
            cart,
            setCart
            }}
            >
            {children}
        </CartContext.Provider>
        </>
    )
}

export function useCart(){
    return useContext(CartContext)
}