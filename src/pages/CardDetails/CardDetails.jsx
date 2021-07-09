import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { useCart } from '../../context/cartContext'
import Loader from "react-loader-spinner"
import { AiOutlineHeart } from "react-icons/ai"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addToCart } from "../../utils/cart" 
import "./cardDetails.css"
import { useAuth } from '../../context/authContext'



function CardDetails() {
    const [productDetails, setProductDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState("0")
    const [isAdded, setIsAdded] = useState(true)
    const { state : { products, cart, wishlist }, dispatch } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()

    
    const product = products && products.find(cartItem => cartItem._id === id )
    console.log({product})
    // console.log(product_id)

    const itemsInCart = () => cart && cart.find(cartItem => cartItem._id === id )
    const itemsInWishlist = () => wishlist && wishlist.find(wishlistItem => wishlistItem._id === id )


   
    const addToCart = async (e) => {
      if(user){
        if(itemsInCart){
          try {
            const response = await axios.post("https://crickart.herokuapp.com/cart",
            {
              user : user._id,
              productId : id,
              quantity : 1
            })
            dispatch({ type : "ADD__TO__CART", payload : product })
          }catch(error){
            console.log(error)
          }
          }else {
        }
      }else {
        navigate("/login")
      } 
    }  

    const addToWishlist = async (e) => {
      console.log("clicked")
      if(user){
        if(itemsInWishlist){
          try {
            const response = await axios.post("https://crickart.herokuapp.com/wishlist",
            {
              userId : user._id,
              productId : id,
            })
            console.log(response)
            dispatch({ type : "ADD__TO__WISHLIST", payload : product })
          }catch(error){
            console.log(error)
          }
          }
      }else {
        navigate("/login")
      }
    }  

    console.log(id)
    useEffect(() => {
        (async function getItems() {
          try {
            const result = await axios.get(`https://crickart.herokuapp.com/product/${id}`);
            setLoading(false)
            setProductDetails(result.data);
          } catch (err) {
            console.log(err);
          }
        })();
      }, [id]);

      function handleClick(id) {
          console.log("clicked",id)
            setImage(id)
      }
    return (
        <>
        {loading 
        ? ( <Loader
            type="ThreeDots"
            color="#2563EB"
            height={100}
            width={100}
            timeout={3000} 
            style={{margin : "0 20rem"}}
          /> ) 
        : (
        <div className="cardDetails">
          {product !== undefined && (
            <>
            <div className="cardDetails__left">
                <div className="cdDetails__image">
                  <img src={product.imageURL[image]} className="cd__img"/>
                {itemsInWishlist() 
                ? <Link to="/wishlist">
                  <div className="wishList__icon">
                  <AiOutlineHeart size={30} />
                  <ToastContainer/>
                  </div>
                  </Link> 
                : <div className="wishList__icon" onClick={(e) => addToWishlist(e)}>
                  <AiOutlineHeart size={30} />
                  <ToastContainer/>
                </div> 
                }
                </div>
                <div className="cardDetails__img" >{product.imageURL.map((item,id) => (
                    <ul>
                        <img src = {item} className="img" onClick={() => handleClick(id)}/>
                    </ul>
                ))}
                </div>
            </div>
            <div className="cardDetails__right">
                <p className="cardDetails__title">{product.title}</p> 
                 <div className="cardDetails__details">{product.details}</div>
                <div className="cd__details">
                <p className="cardDetails__price">Price :  ₹ {product.price} </p> 
                <p className="cardDetails__price discount"> {product.discount}% </p> 
                <p className="cardDetails__price netprice"> ₹ {product.netPrice} </p> 
                </div>
                { itemsInCart() ? 
                <Link to="/cart">
                <button 
                className="btn button-primary">
                <i className="fa fa-shopping-cart"> 
                Go to Cart </i>
                </button>
                <ToastContainer/>
                </Link> :
                <button 
                    className="btn button-primary" 
                    onClick={(e) => addToCart(e)}
                    >
                    <i className="fa fa-shopping-cart"> 
                    Add to Cart </i>
                    </button> 
                    }
            </div>
            </>
            
          )}
        </div>
    )
}
        </>
    )
}

export default CardDetails







// function addToCart(productDetails){
    //     console.log({productDetails})
    //     toast("Added to cart",{type : "info"})
    //     dispatch({ type : "SET__CART", payload : productDetails })
    //     dispatch({ type : "INCREASE__ITEM", payload : productDetails._id })
    //     let inCart = false;
    //     setIsAdded(prev => !prev)
    //     setItemsInCart(itemsInCart.map(currItems => {
    //         if(currItems.id=== productDetails._id) {
    //             inCart = true
    //             return {
    //                 ...currItems,
    //                 quantity: currItems.quantity+1
    //             }
    //         }
    //         return currItems
    //     }))
    //     if(!inCart){
    //         setItemsInCart([...itemsInCart,{productDetails,quantity:1}])
    //     }
    // }
    // function addToWishList(productDetails){
    //     toast("Added to wishlist", { type: "info"})
    //     let inCart = false
    //     setWishlist(wishlist.map(currItem => {
    //         if(currItem.id===productDetails._id){
    //             inCart = true
    //             toast("Already marked", {type : "warning"})
    //               return { 
    //                 ...currItem,
    //                  quantity: currItem.quantity + 1
    //              }

    //          }
    //         return currItem
    //     }))
    //     if(!inCart){
    //         setWishlist([...wishlist,{productDetails,quantity:1}])
    //     }
    // }

      // useEffect(async () => {
      //      try {
      //          const response = await axios.post(
      //           "https://crickart.herokuapp.com/cart",
      //           {
      //             cart: cart,
      //           },
      //         );
      //         console.log("cart", response.data.cart);
      //         dispatch({type : "ADD__TO__CART", payload: response.data})
      //     } catch (err) {
      //       console.log(err);
      //     }
      // }, [cart]);

    //   useEffect(async () => {
    //     try {
    //       (async function postItems() {
    //         const response = await axios.post(
    //           "https://evening-woodland-75481.herokuapp.com/wishlist",
    //           {
    //             wishlist: wishlist,
    //           },
    //         );
    //         console.log("wishlist", response.data.wishlist);
    //         response.data.wishlist &&
    //           localStorage.setItem("wishlist", JSON.stringify(response.data.wishlist));
    //       })();
    //     } catch (err) {
    //       console.log(err);
    //     }
    // }, [wishlist]);