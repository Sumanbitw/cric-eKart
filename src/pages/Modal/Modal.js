import React from 'react'
import { useCart } from '../../context/cartContext'
import "./modal.css"

export default function Modal({showModal, close,item}) {
    const {wishlist,setWishlist} = useCart()

    function removeItemsFromWishList(items){
        setWishlist(wishlist.filter(curr => curr.id !== items.id))
    }
    return (
        <div className={showModal ? "overlay" : "hide__modal"} onClick={close}>
           <div className ={showModal ? "show__modal" : "hide__modal"}>
        <div className="modal__container">
           <p>Do you want to remove the item from wishlist ? </p>
           <button onClick={() => removeItemsFromWishList(item)} className="modal__remove">Remove</button>
           <button onClick={close} className="modal__cancel">Cancel</button>
           </div>
        </div> 

        </div>
    )
}

