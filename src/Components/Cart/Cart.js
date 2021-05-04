import React from 'react'
import { useCart } from '../../context/cartContext'
import { Link } from "react-router-dom"
import "./cart.module.css"
import "./cart.css"
import cart from "../../Images/cart.svg"


function ShowCart({item}){
    const { itemsInCart,setItemsInCart,wishList,setWishList} = useCart()
    function increaseItemQuantity(items){
        console.log({items})
        setItemsInCart( itemsInCart.map(currItems => {
                console.log({currItems})
                if(currItems.productDetails._id ===items.productDetails._id ){
                    return {
                        ...currItems,
                        quantity : currItems.quantity + 1,
                    }
                }else {
                    return currItems
                }
            })
        )
    }
    function decreaseItemQuantity(items){
        setItemsInCart(itemsInCart.map(currItems => {
            if(currItems.productDetails._id === items.productDetails._id){
                return {
                    ...currItems,
                    quantity : currItems.quantity - 1,
                }
              }else{
                return currItems
            }
        }))
    }

    function removeItem(items){
        setItemsInCart(itemsInCart.filter(currItems => currItems.productDetails._id !== items.productDetails._id))
    }
    function wishListToCart(items){
        let inCart = false
        setWishList(wishList.map(currItems => {
            if(currItems.productDetails._id === items.productDetails._id){
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
            setWishList([...wishList,{...item,quantity:1}])
        )
    }
    
    return (
        <>
        <div className="cart__container" key={item.productDetails.id}>
            <div className="cart__list">
                <img 
                    src={item.productDetails.imageURL[0]} 
                    alt=""  
                    className="cart__img"/>
            </div>
            <div className="cart__name">
                <span className="cart__title">
                    {item.productDetails.title}
                </span><br/>
                <span className="cart__price">
                    ₹
                <b>
                    {item.productDetails.price}
                </b>
                </span><br/>
            <div className="btn__qty">
                <button  
                    onClick={() => increaseItemQuantity(item)} 
                    style={{marginRight:"10px",padding:"3px 5px"}}>
                    +
                </button>
                <span>
                    Quantity : {item.quantity}
                </span>
                <button 
                disabled={item.quantity === 1 ? true : false} 
                onClick={() => decreaseItemQuantity(item)} 
                style={{marginLeft:"10px",padding:"3px 5px"}}>
                    -
                </button>
            </div>
            <div className="buttons">
                <button 
                    onClick={() => removeItem(item)} 
                    className="btn-primary btn__remove btn__bg">
                        Remove
                </button>
                <button 
                    onClick={() => wishListToCart(item)} 
                    className="btn-primary btn__bag btn__bg">
                        Wishlist
                </button>
            </div>

            </div>
        </div>
        </>
    )
}
function Cart() {
    const {itemsInCart} = useCart()
function getPrice(){
    let total = 0 ;
    itemsInCart.map(item => total = total + parseInt(item.productDetails.price) * parseInt(item.quantity))
    return total
}
    return (
        <div className="cart__products">
            {(itemsInCart.length === 0) ? 
            <div className="cart__items">
                <div className="img">
                <img src={cart} alt=""/>
                </div>
                <p style={{fontSize:"20px",margin:"1rem",color:"grey"}}>
                    Add items in cart
                </p>
                </div> : 
                <p style={{fontSize:"25px"}}>
                    My Cart :{itemsInCart.length}
                </p> }<br/>
            <div className="cart__header">
           {itemsInCart.map((item) => (
           <ul>
               <ShowCart item={item}/>
            </ul>
            ))}
            </div>
            {itemsInCart.length!==0 &&
            <div className="cart__checkout">
                <div className="checkout">
                <h1>Checkout</h1>
                <div className="checkout__container">
                <p>Price </p>
                <span> ₹ {getPrice()}</span>
                </div>
                </div>
                <Link to="/cart">
                <button 
                className="btn-secondary">
                    Proceed to checkout
                </button> 
                </Link>
            </div>
}
        </div>
    )
}
export default Cart
