import axios from "axios";
import React, { useEffect, useReducer }  from "react"
import { createContext, useContext,useState } from "react";
import { reducer } from "../reducer/cartReducer"
import { useAuth } from "./authContext";
export const CartContext = createContext()

export function CartProvider({children}){
    const [itemsInCart , setItemsInCart] = useState([])
    const [wishlist,setWishlist] = useState([])
    const [products,setProducts] = useState([])
    // const [cart, setCart] = useState(false)
    const { user } = useAuth()

    console.log(user._id)
    const initialState = {
        products : [],
        itemsInCart : [],
        cart : [],
        wishlist : [],
        showInventoryAll : true,
        showFastDeliveryOnly: false,
        sortBy : null
    }
    const [state, dispatch] = useReducer(reducer, initialState)

        useEffect(() => {
            (async function () {
                try{
                    const response = await axios.get("https://crickart.herokuapp.com/product")
                    console.log(response.data.cart)
                    dispatch({ type : "SET__PRODUCTS", payload : response.data.cart })
                }catch(error){
                    console.log(error)
                }
            })()
        }, [])   

        useEffect(() => {
        (async function (){
            try{
                const response = await axios.get(`https://crickart.herokuapp.com/cart/${user._id}`)
                dispatch({ type : "SET__CART", payload : response.data})
            }catch(error){
                console.log(error)
            }
        })()
    },[user])

    useEffect(() => {
        (async function (){
            try{
                const response = await axios.get(`https://crickart.herokuapp.com/wishlist/${user._id}`)
                console.log(response.data)
                dispatch({ type : "SET__WISHLIST", payload : response.data })
            }catch(error){
                console.log(error)
            }
        })()
    },[user])

    return (
        <>
        <CartContext.Provider 
        value={{
            itemsInCart,
            setItemsInCart,
            products,
            wishlist,
            setWishlist,
            setProducts,
            // cart,
            // setCart,
            state,
            dispatch
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