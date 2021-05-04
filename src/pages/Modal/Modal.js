import React from 'react'
import { useCart } from '../../context/cartContext'
import "./modal.css"

export default function Modal({showModal, close,item}) {
    const {wishList,setWishList} = useCart()

    function removeItemsFromWishList(items){
        setWishList(wishList.filter(curr => curr.id !== items.id))
    }
    return (
        <div className={showModal ? "overlay" : "hide__modal"} onClick={close}>
           <div className ={showModal ? "show__modal" : "hide__modal"}>
           <p>Do you want to remove the item ? </p>
           <button onClick={() => removeItemsFromWishList(item)}>Remove</button>
           <button onClick={close}>Cancel</button>
            </div> 

        </div>
    )
}

