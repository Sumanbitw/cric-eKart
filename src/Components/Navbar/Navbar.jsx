import React, { useEffect } from "react"
import { useCart } from "../../context/cartContext"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiSearch, BiUserCircle} from "react-icons/bi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineHeart } from "react-icons/ai"
import "./navbar.css"
import { useAuth } from "../../context/authContext"

export default function Navbar (){
    const { state : { cart, wishlist }, dispatch } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
      user && navigate("/", { replace : true })
  }, [])

    const logout = () => {
      localStorage.removeItem('auth')
      navigate(state?.from ? state.from : "/login" )
    }
    return (

        <header>
          <nav>
                <Link to="/" style={{textDecoration:"none"}}><p className="navbar__header">Crickart</p></Link>
                <div className="nav__search">
                <input type = "text" placeholder="Search for products, brands and more"  className="navbar__input"/>
                <BiSearch className="search__icon" size={20}/>
                </div>
              <ul>
                
              <Link to="/cart" style={{textDecoration:"none"}}>
                <li><AiOutlineShoppingCart size={30} cursor="pointer" color="#2563EB"/>
                <span className="cart__icon">
                  {cart && cart.length}
                </span>
                </li>
              </Link>
              {!user 
              ? <Link to="/login" style={{textDecoration:"none"}}>
                <li><BiUserCircle size={30} cursor="pointer" color="#2563EB"/></li>
                </Link>
                
              : <li><BiUserCircle size={30} cursor="pointer" color="#2563EB"/>
              <span className="cart__icon">
                Hello {user.name}
              </span>
              <button onClick={() => logout() }>Logout</button>
              </li>
              }
              <Link to="/wishlist" style={{textDecoration:"none"}}><li><AiOutlineHeart size={30} cursor="pointer" color="#2563EB"/><span className="cart__icon">{wishlist && wishlist.length}</span></li></Link> 
              </ul>  
          </nav>
        </header>  
        
    )
}