import React, { useEffect } from "react"
import Cart from "./Components/Cart/Cart"
import Navbar from "./Components/Navbar/Navbar"
import Checkout from "./Components/Checkout/Checkout"
import ProductListing from "./Components/Product/ProductListing"
import WishList from "./Components/Wishlist/WishList"
import axios from "axios"
import CardDetails from "./pages/CardDetails/CardDetails"
import Login from "./pages/login/Login"
import Home from "./pages/Home/Home"
import { Routes, Route, Navigate} from "react-router-dom"
import { useCart } from "./context/cartContext"


// const PrivateRoute = ({path, isLoggedIn, element}) => {
//   if(isLoggedIn === true) {
//     return element
//   } else {
//     return <Navigate to="/login"/> 
//   }
// }

export default function App() {
  const { setWishlist } = useCart()
  const { setItemsInCart } = useCart()
  
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
  return (
    <div className="app">
        <Route path="/" element={<Navbar />} />
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/products" element={<ProductListing/>} />
        <Route path="/cardDetails/:id" element={<CardDetails/>} />
        <Route path="/wishlist" element={<WishList/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/login" element={<Login/>} />
        {/* <PrivateRoute path="/cart" isLoggedIn = {cart} element={<Cart/>} /> */}
        </Routes>
    </div>
  );
}
