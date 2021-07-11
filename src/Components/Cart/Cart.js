import React ,{ useEffect,useState } from 'react'
import { useCart } from '../../context/cartContext'
import { Link } from "react-router-dom"
import axios from "axios"
import "./cart.module.css"
import Loader from "react-loader-spinner"
import "./cart.css"
import { useAuth } from '../../context/authContext'



function ShowCart({ cartItem }){
    const { dispatch } = useCart()
    const { user } = useAuth()
    console.log({cartItem})
    
    const increaseItemQuantity = async () => {
        try {
            console.log(user._id, cartItem._id)
            const response = await axios.patch(`https://crickart.herokuapp.com/cart/${user._id}/${cartItem._id}`,
            {
                quantity : cartItem.quantity + 1
            })
            console.log(response.data)
            dispatch({ type : "INCREASE__QUANTITY", payload : cartItem })
        }catch(error){
            console.log(error)
        }
    }

    const decreaseItemQuantity = async () => {
        try {
            console.log(user._id, cartItem._id)
            const response = await axios.patch(`https://crickart.herokuapp.com/cart/${user._id}/${cartItem._id}`,
            {
                quantity : cartItem.quantity - 1
            })
            console.log(response.data)
            dispatch({ type : "DECREASE__QUANTITY", payload : cartItem })
        }catch(error){
            console.log(error)
        }
    }

    const removeItem = async () => {
        const response = await axios.delete(
            `https://crickart.herokuapp.com/cart/${user._id}/${cartItem._id}`
        )
        console.log(response.data)
        dispatch({ type : "REMOVE__ITEM__FROM__CART", payload : cartItem })
    }

    const wishListToCart = async (e) => {
        console.log("clicked")
            try {
              const response = await axios.post("https://crickart.herokuapp.com/wishlist",
              {
                userId : user._id,
                productId : cartItem._id,
              })
              console.log(response)
              dispatch({ type : "ADD__TO__WISHLIST", payload : cartItem })
            }catch(error){
              console.log(error)
            }
        }
        
  
    return (
        <>
        <div className="cart__container" key={cartItem._id}>
            <div className="cart__list">
                <img 
                    src={cartItem.imageURL[0]} 
                    alt="image"  
                    className="cart__img"/>
            </div>
            <div className="cart__name">
                <span className="cart__title">
                    {cartItem.title}
                </span><br/>
                <span className="cart__price">
                    ₹
                <b>
                    {cartItem.price}
                </b>
                </span><br/>
            <div className="btn__qty">
                <button  
                    onClick={increaseItemQuantity} 
                    style={{marginRight:"10px",padding:"3px 5px"}}>
                    +
                </button>
                <span>
                    Quantity : {cartItem.quantity}
                </span>
                <button  
                onClick={decreaseItemQuantity} 
                style={{marginLeft:"10px",padding:"3px 5px"}}
                disabled={cartItem.quantity === 1 ? true : false}
                >
                    -
                </button>
            </div>
            <div className="buttons">
                <button 
                    onClick={removeItem} 
                    className="btn-primary btn__remove btn__bg">
                        Remove
                </button>
                <button 
                    onClick={() => wishListToCart()} 
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
    const { state : { cart }  } = useCart()
    const { user } = useAuth()

    console.log(cart)
    useEffect(() => {
        (async function getItemsInCart(){
            try{
                const response = await axios.get(`https://crickart.herokuapp.com/cart/${user._id}`)
                console.log(response)
            }catch(error){
                console.log(error)
            }
        })()
    },[])

    function getPrice(){
        let total = 0 ;
        cart && cart.map(item => total = total + item.price * item.quantity)
        console.log(total)
        return total
    }
    
    return (
        <>
        <div className="cart__products">
            <h1>Welcome {user?.name}</h1>
            {(cart && cart.length === 0) 
            ? <div className="cart__items">
                <div className="img"></div>
                <p style={{fontSize:"20px",margin:"1rem",color:"grey"}}>
                    Add items in cart
                </p>
              </div> 
            : 
                <p style={{fontSize:"25px"}}>
                    My Cart :{cart && cart.length}
                </p> 
            }

            <div className="cart__header">
                {cart && cart.map((cartItem) => (
                <ul>
                    <ShowCart cartItem={cartItem}/>
                </ul>
                ))}
            </div>

                {cart.length!==0 && <div className="cart__checkout">
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
           
        </>
    )
}
export default Cart
