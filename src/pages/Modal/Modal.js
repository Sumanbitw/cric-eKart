import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useCart } from '../../context/cartContext'
import axios from "axios"
import "./modal.css"

export default function Modal({showModal, close, wishlistItem}) {
    const { user } = useAuth()
    const { dispatch } = useCart()

    const removeItem = async () => {
        const response = await axios.delete(
            `https://crickart.herokuapp.com/wishlist/${user._id}/${wishlistItem._id}`
        )
        console.log(response.data)
        dispatch({ type : "REMOVE__ITEM__FROM__WISHLIST", payload : wishlistItem })
    }
    useEffect(() => {
        (async function getItemsInCart(){
            try{
                const response = await axios.get(`https://crickart.herokuapp.com/wishlist/${user._id}`)
                console.log(response)
            }catch(error){
                console.log(error)
            }
        })()
    },[])
    return (
        <div className={showModal ? "overlay" : "hide__modal"} onClick={close}>
           <div className ={showModal ? "show__modal" : "hide__modal"}>
        <div className="modal__container">
           <p>Do you want to remove the item from wishlist ? </p>
           <button onClick={() => removeItem()} className="modal__remove">Remove</button>
           <button onClick={close} className="modal__cancel">Cancel</button>
           </div>
        </div> 

        </div>
    )
}

