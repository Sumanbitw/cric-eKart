import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useCart } from '../../context/cartContext'

function Login() {
    const { cart, setCart } = useCart()
    const navigate = useNavigate()
    const params = useLocation()
    return (
        <div>
            <p>This is a Login page</p>
            <button onClick={ () => {
                setCart(prev => !prev)
                navigate("/cart")
                }}>{cart ? "Logout" : "Login"}</button>
        </div>
    )
}

export default Login
