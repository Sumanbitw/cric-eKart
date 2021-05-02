import React, { useState } from 'react'
import { useCart } from '../../context/cartContext'
import Modal from "../../pages/Modal/Modal"
import wishlist from "../../Images/wishlist.svg"
import "./wishlist.module.css"

function ShowWishList({item}){
    const [showModal, setShowModal] = useState(false)
    console.log({item})
    const {itemsInCart,setItemsInCart} = useCart()
function wishListToCart(items){
    let inCart = false
    setItemsInCart(itemsInCart.map(currItems => {
        if(currItems.id === items.id){
            inCart = true
            return {
                ...currItems,
                quantity: currItems.quantity + 1
            }
        }else{
            return currItems
        }
    }))
    if(!inCart)(
        setItemsInCart([...itemsInCart,{...item,quantity:1}])
    )
}

// function removeItemsFromWishList(items){
//     setWishList(wishList.filter(currItems => currItems.id !== items.id))
//     }

const open = () => setShowModal(true)
const close = () => setShowModal(false)
    return (
        <div className="wishlist__items">
            <div className="cart__list">
                
                <img src={item.productDetails.imageURL[0]} alt="" />
            
                <div className="cart__name">
                <span className="cart__item">{item.productDetails.title}</span><br/>
                <span className="cart__price">
                    ₹
                <b>{item.productDetails.price}</b>
            </span><br/>
            <div className="btn__wishList">
                <button className="btn-primary btn__bag" onClick={() => wishListToCart(item) } ><i className="fa fa-shopping-cart"> Add to Bag </i></button>
                <button onClick={open} className="btn-primary btn__remove">Remove</button>
                <Modal showModal={showModal} close={close} item={item}/>
                </div>
                </div>
                </div>
        </div>
    )
}
function WishList() {
    const {wishList} = useCart()
    return (
        <div className="whishlist">
        {(wishList.length) === 0 ? <div className="cart__items wishlist"><img src={wishlist} alt=""/><p style={{fontSize:"25px",margin:"1rem",color:"grey"}}>WishList is Empty</p></div> : <p style={{fontSize:"25px",margin:"1rem"}}>Wishlist : ({wishList.length})  </p>}
            <div className="wishlist__container">
            {wishList.map(item => (
                <ul>
                    <ShowWishList item={item}/>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default WishList
