import React ,{ useEffect,useState } from 'react'
import { useCart } from '../../context/cartContext'
import { Link } from "react-router-dom"
import axios from "axios"
import "./cart.module.css"
import Loader from "react-loader-spinner"
import "./cart.css"
// import cart from "../../Images/cart.svg"


function ShowCart({item}){
    const { itemsInCart,setItemsInCart,wishlist,setWishlist} = useCart()

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
        setWishlist(wishlist.map(currItems => {
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
            setWishlist([...wishlist,{...item,quantity:1}])
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
    const {itemsInCart, setItemsInCart} = useCart()
    const { wishlist, setWishlist } = useCart()
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
          (async function getItems() {
          //   setLoading(true);
            const res = await axios.get(
              "https://evening-woodland-75481.herokuapp.com/cart",
            );
            console.log(res);
          //   setLoading(false);
            res.data.itemsInCart && setItemsInCart(res.data.itemsInCart);
          })();
        } catch (err) {
          // setLoading(false);
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

    useEffect(() => {
      try {
        (async function getItems() {
        //   setLoading(true);
          const res = await axios.get(
            "https://evening-woodland-75481.herokuapp.com/wishlist",
          );
          console.log(res);
        //   setLoading(false);
          res.data.wishlist && setWishlist(res.data.wishlist);
        })();
      } catch (err) {
        // setLoading(false);
        console.log(err);
      }
  }, []);
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

function getPrice(){
    let total = 0 ;
    itemsInCart.map(item => total = total + parseInt(item.productDetails.price) * parseInt(item.quantity))
    return total
}
    return (
        <>
        {/* { loading ? ( <Loader
            type="ThreeDots"
            color="#2563EB"
            height={100}
            width={100}
            timeout={3000} 
            style={{margin : "0 20rem"}}
            /> ) : ( */}
        <div className="cart__products">
            {(itemsInCart.length === 0) ? 
            <div className="cart__items">
                <div className="img">
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
            {/* ) */}
{/* } */}
        </>
    )
}
export default Cart
