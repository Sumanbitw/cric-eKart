import React, { useState } from 'react'
import { useCart } from '../../context/cartContext'
import Modal from "../../pages/Modal/Modal"
import wishlist from "../../Images/wishlist.svg"
import "./wishlist.css"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import "./wishliststyles.css"

function ShowWishList({item}){
    const [showModal, setShowModal] = useState(false)
    console.log({item})
    const { itemsInCart, setItemsInCart } = useCart()
function addToCart(items) {
    toast("Added to Cart", {type : "info"})
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
const open = () => setShowModal(true)
const close = () => setShowModal(false)
    return (
        <div className="wishlist__item-details">
            <div className="wishlist__list">
                <div className="wishlist__image">
                <img src={item.productDetails.imageURL[0]} alt="" />
                </div>
                <div className="wishlist__name">
                <span className="wishlist__item">{item.productDetails.title}</span><br/>
                <div className="whislist__price__details">
                <p>  ₹ {item.productDetails.price}</p>
                <p style={{color:"green"}}> {item.productDetails.discount} %</p>
                <p style={{textDecoration:"line-through", color:"grey"}}> ₹ {item.productDetails.netPrice}</p>
            </div><br/>
            <div className="btn__wishList">
                <button className="wishlist__btn" onClick={() => addToCart(item) } ><i className="fa fa-shopping-cart"> Add to Bag </i></button>
                <ToastContainer />
                <button onClick={open} className="wishlist__remove">Remove</button>
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
        {(wishList.length) === 0 ? <div className="wishlist__items wishlist"><img src={wishlist} alt=""/><p style={{fontSize:"15px",margin:"1rem",color:"grey"}}>WishList is Empty</p></div> : <p style={{fontSize:"25px",margin:"1rem"}}>Wishlist : ({wishList.length})  </p>}
            <div className="wishlist__container " >
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
