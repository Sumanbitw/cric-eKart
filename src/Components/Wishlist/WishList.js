import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/cartContext'
import Modal from "../../pages/Modal/Modal"
import axios from "axios"
import "./wishlist.css"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function ShowWishList({item}){
    const [showModal, setShowModal] = useState(false)
    const { itemsInCart, setItemsInCart } = useCart()
    const {wishlist, setWishlist} = useCart()
    console.log({item})


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
    const { wishlist } = useCart()
    const { setWishlist} = useCart()
    const { itemsInCart, setItemsInCart } = useCart()

    useEffect(() => {
        try {
          (async function getItems() {
            const res = await axios.get(
              "https://evening-woodland-75481.herokuapp.com/wishlist",
            );
            console.log(res);
            res.data.wishlist && setWishlist(res.data.wishlist);
          })();
        } catch (err) {
          console.log(err);
        }
    }, []);
    useEffect(async () => {
        try {
          (async function postItems() {
            const response = await axios.post(
              "https://evening-woodland-75481.herokuapp.com/cart",
              {
                itemsInCart: itemsInCart,
              },
            );
            console.log("cart", response.data.itemsInCart);
            localStorage.setItem("cart", JSON.stringify(response.data.itemsInCart));
          })();
        } catch (err) {
          console.log(err);
        }
    }, [itemsInCart]);
    useEffect(async () => {
        try {
          (async function postItems() {
            const response = await axios.post(
              "https://evening-woodland-75481.herokuapp.com/wishlist",
              {
                wishlist: wishlist,
              },
            );
            console.log("wishlist", response.data.wishlist);
            localStorage.setItem("wishlist", JSON.stringify(response.data.wishlist));
          })();
        } catch (err) {
          console.log(err);
        }
    }, [wishlist]);
    return (
        <div className="whishlist">
        {(wishlist.length) === 0 ? <div className="wishlist__items wishlist"><p style={{fontSize:"15px",margin:"1rem",color:"grey"}}>WishList is Empty</p></div> : <p style={{fontSize:"25px",margin:"1rem"}}>Wishlist : ({wishlist.length})  </p>}
            <div className="wishlist__container " >
            {wishlist.map(item => (
                <ul>
                    <ShowWishList item={item}/>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default WishList
