import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { useCart } from '../../context/cartContext'
import Loader from "react-loader-spinner"
import { AiOutlineHeart } from "react-icons/ai"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./cardDetails.css"


function CardDetails() {
    const [productDetails, setProductDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState("0")
    const [isAdded, setIsAdded] = useState(true)
    const {itemsInCart, setItemsInCart} = useCart()
    const { wishlist, setWishlist } = useCart()
    
    function addToCart(productDetails){
        console.log({productDetails})
        toast("Added to cart",{type : "info"})
        let inCart = false;
        setIsAdded(prev => !prev)
        setItemsInCart(itemsInCart.map(currItems => {
            if(currItems.id=== productDetails._id) {
                inCart = true
                return {
                    ...currItems,
                    quantity: currItems.quantity+1
                }
            }
            return currItems
        }))
        if(!inCart){
            setItemsInCart([...itemsInCart,{productDetails,quantity:1}])
        }
    }
    function addToWishList(productDetails){
        toast("Added to wishlist", { type: "info"})
        let inCart = false
        setWishlist(wishlist.map(currItem => {
            if(currItem.id===productDetails._id){
                inCart = true
                toast("Already marked", {type : "warning"})
            //     return { 
            //         ...currItem,
            //         quantity: currItem.quantity + 1
            //     }

            }
            // return currItem
        }))
        if(!inCart){
            setWishlist([...wishlist,{productDetails,quantity:1}])
        }
    }

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
              response.data.itemsInCart &&
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
            response.data.wishlist &&
              localStorage.setItem("wishlist", JSON.stringify(response.data.wishlist));
          })();
        } catch (err) {
          console.log(err);
        }
    }, [wishlist]);

    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        (async function getItems() {
          try {
            const result = await axios.get(`https://evening-woodland-75481.herokuapp.com/product/${id}`);
            setLoading(false)
            setProductDetails(result.data);
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);

      function handleClick(id) {
          console.log("clicked",id)
            setImage(id)
      }

    return (
        <>
        {loading ? ( <Loader
            type="ThreeDots"
            color="#2563EB"
            height={100}
            width={100}
            timeout={3000} 
            style={{margin : "0 20rem"}}
          /> ) : (
        <div className="cardDetails">
            <div className="cardDetails__left">
                <div className="cdDetails__image">
                    <img src={productDetails && productDetails.imageURL[image]} className="cd__img"/>
                <div className="wishList__icon"><AiOutlineHeart size={30} onClick={()=> addToWishList(productDetails)}/>
                <ToastContainer/>
                </div>
                </div>
                <div className="cardDetails__img" >{productDetails && productDetails.imageURL.map((item,id) => (
                    <ul>
                        <img src = {item} className="img" onClick={() => handleClick(id)}/>
                    </ul>
                ))}
                </div>
            </div>
            <div className="cardDetails__right">
                <p className="cardDetails__title">{productDetails && productDetails.title}</p> 
                 <div className="cardDetails__details">{productDetails && productDetails.details.map(item => (
                         <p>{item}</p>
                 ))}</div>
                <div className="cd__details">
                <p className="cardDetails__price">Price :  ₹ {productDetails && productDetails.price} </p> 
                <p className="cardDetails__price discount"> {productDetails && productDetails.discount}% </p> 
                <p className="cardDetails__price netprice"> ₹ {productDetails && productDetails.netPrice} </p> 
                </div>
                { isAdded ? 
                <button 
                    className="btn button-primary" 
                    onClick={()=>addToCart(productDetails)}>
                    <i className="fa fa-shopping-cart"> 
                    Add to Cart </i>
                    </button> : 
                    <Link to="/cart">
                    <button 
                    className="btn button-primary">
                    <i className="fa fa-shopping-cart"> 
                    Go to Cart </i>
                    </button>
                    <ToastContainer/>
                    </Link>}
            </div>
        </div>
    )
}
        </>
    )
}

export default CardDetails
