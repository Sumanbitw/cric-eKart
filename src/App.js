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
import Signup from "./pages/signup/Signup"
import { PrivateRoute } from "./api/PrivateRoute/PrivateRoute"
import { useAuth } from "./context/authContext"

export default function App() {
  const { setWishlist } = useCart()
  const { setItemsInCart } = useCart()
  const { state : { products }, dispatch } = useCart()
  const { user } = useAuth()

  return (
    <div className="app">
        <Route path="/" element={<Navbar />} />
        <Routes>
        <Route path="/" element={<Home/>} />
        <PrivateRoute path="/cart" element={<Cart/>} />
        <Route path="/products" element={<ProductListing/>} />
        <Route path="/cardDetails/:id" element={<CardDetails/>} />
        <PrivateRoute path="/wishlist" element={<WishList/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        </Routes>
    </div>
  );
}
