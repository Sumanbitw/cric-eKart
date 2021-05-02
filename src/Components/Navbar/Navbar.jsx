import React from "react"
import { useCart } from "../../context/cartContext"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiSearch, BiUserCircle} from "react-icons/bi"
import { Link } from "react-router-dom"
import { AiOutlineHeart } from "react-icons/ai"
import "./navbar.css"

export default function Navbar (){
    const { itemsInCart,wishList} = useCart()
    return (

        <header>
          <nav>
                <Link to="/" style={{textDecoration:"none"}}><p className="navbar__header">Crickart</p></Link>
                <div className="nav__search">
                <input type = "text" placeholder="Search for products, brands and more"  className="navbar__input"/>
                <BiSearch className="search__icon" size={20}/>
                </div>
              <ul>
                
              <Link to="/cart" style={{textDecoration:"none"}}><li><AiOutlineShoppingCart size={30} cursor="pointer" color="#2563EB"/><span className="cart__icon">{itemsInCart.length}</span></li></Link>
              <Link to="/login" style={{textDecoration:"none"}}><li><BiUserCircle size={30} cursor="pointer" color="#2563EB"/><span className="cart__icon"></span></li></Link>
              <Link to="/wishlist" style={{textDecoration:"none"}}><li><AiOutlineHeart size={30} cursor="pointer" color="#2563EB"/><span className="cart__icon">{wishList.length}</span></li></Link> 
              </ul>  
          </nav>
        </header>  
        
    )
}