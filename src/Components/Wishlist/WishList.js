import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/cartContext'
import Modal from "../../pages/Modal/Modal"
import axios from "axios"
import "./wishlist.css"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/authContext'



 function ShowWishList({wishlistItem}){
    const [showModal, setShowModal] = useState(false)
    const { state : { cart }, dispatch  } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    console.log({wishlistItem})

    const itemsInCart = () => cart.find(cartItem => cartItem._id === wishlistItem._id )

    const addToCart = async (e) => {
          if(!itemsInCart()){
            try {
              const response = await axios.post("https://crickart.herokuapp.com/cart",
              {
                user : user._id,
                productId : wishlistItem._id,
                quantity : 1
              })
              dispatch({ type : "ADD__TO__CART", payload : wishlistItem })
            }catch(error){
              console.log(error)
            }
            }
      }  
    // const open = () => setShowModal(true)
    // const close = () => setShowModal(false)

    const removeItem = async () => {
        const response = await axios.delete(
            `https://crickart.herokuapp.com/wishlist/${user._id}/${wishlistItem._id}`
        )
        console.log(response.data)
        dispatch({ type : "REMOVE__ITEM__FROM__WISHLIST", payload : wishlistItem })
    }

    return (
        <div className="wishlist__item-details">
            <div className="wishlist__list">
                <div className="wishlist__image">
                <img src={ wishlistItem && wishlistItem.imageURL[0]} alt="" />
                </div>
                <div className="wishlist__name">
                <span className="wishlist__item">{wishlistItem && wishlistItem.title}</span><br/>
                <div className="whislist__price__details">
                <p>  ₹ {wishlistItem && wishlistItem.price}</p>
                <p style={{color:"green"}}> {wishlistItem && wishlistItem.discount} %</p>
                <p style={{textDecoration:"line-through", color:"grey"}}> ₹ {wishlistItem && wishlistItem.netPrice}</p>
            </div><br/>
            <div className="btn__wishList">
                {itemsInCart()
                ? <Link to="/cart"><button className="wishlist__btn"><i className="fa fa-shopping-cart"> Go to Bag </i></button></Link>
                : <button className="wishlist__btn" onClick={addToCart}><i className="fa fa-shopping-cart"> Add to Bag </i></button>      }
                <ToastContainer />
                <button onClick={removeItem} className="wishlist__remove">Remove</button>
                {/* <Modal showModal={showModal} close={close} wishlistItem={wishlistItem && wishlistItem}/> */}
                </div>
                </div>
                </div>
        </div>
    )
}
function WishList() {
    const {state : { wishlist }} = useCart()
    const { user } = useAuth()
    console.log({ wishlist })

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
        <div className="whishlist">
        {(wishlist && wishlist.length) === 0 
        ? <div className="wishlist__items wishlist">
            <p style={{fontSize:"15px",margin:"1rem",color:"grey"}}>
                WishList is Empty
            </p></div> 
        : <p style={{fontSize:"25px",margin:"1rem"}}>
            Wishlist : ({wishlist && wishlist.length})  
          </p>}
            <div className="wishlist__container " >
            {wishlist && wishlist.map(wishlistItem => (
                <ul>
                    <ShowWishList wishlistItem={wishlistItem}/>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default WishList
