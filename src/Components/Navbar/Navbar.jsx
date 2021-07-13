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
    const { user, setUser } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
      user && navigate("/products", { replace : true })
  }, [])

    const logout = () => {
      setUser("")
      localStorage.removeItem('auth')
        navigate(state?.from ? state.from : "/login" , { replace : true }) 
    }
    return (
        <header>
          <nav>
            <Link to="/" style={{textDecoration:"none"}}>
              <p className="navbar__header">
                Crickart
              </p>
            </Link>

              <ul>  
              {!user 
              ? <Link to="/login" style={{textDecoration:"none"}}>
                <li>
                  <BiUserCircle size={30} cursor="pointer" color="#2563EB"/>
                </li>
                </Link>
                
              : <li>
                {/* <BiUserCircle size={30} cursor="pointer" color="#2563EB"/> */}
                {/* <span className="cart__icon">
                  Hello {user.name}
                </span> */}
              <button 
              onClick={() => logout()}
              className="nav__btn"
              >
                Logout
              </button>
              </li>
              }

              <Link to="/cart" style={{textDecoration:"none"}}>
                <li>
                  <AiOutlineShoppingCart size={30} cursor="pointer" color="#2563EB"/>
                  <span className="cart__icon">
                    {cart && cart.length}
                  </span>
                </li>
              </Link>

              <Link to="/wishlist" style={{textDecoration:"none"}}>
                <li>
                  <AiOutlineHeart size={30} cursor="pointer" color="#2563EB"/>
                  <span className="cart__icon">{wishlist && wishlist.length}
                  </span>
                </li>
              </Link>
              </ul>  
          </nav>
        </header>  
        
    )
}