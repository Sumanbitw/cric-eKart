import React, { useState } from 'react'
import { useCart } from '../../context/cartContext'
import { AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom"
import "./card.css"

function Card ({
    id,
    item,
    title,
    imageURL,
    price,
    fastDelivery,
    inStock,
    discount, 
    netPrice,
    ratings
}) {
    const 
    { 
    itemsInCart,
    setItemsInCart,
    wishList,
    setWishList,
    } = useCart()
    const [isAdded, setIsAdded] = useState(true)

    return (
          <div className="card__container" key={id}>
            <Link to={`/cardDetails/${id}`}>
            <div className="card__image">
            <img 
            src={imageURL[0]} 
            alt="" 
            />
            </div>
            </Link>
            
            <div 
            className="card__details"
            >
                <p className="name">{title}</p>
                <p className="price"><span>₹ {price}</span>
                <span style={{color:"red"}}>({discount}% OFF)</span>
                
                <span style={{color:"grey",textDecoration:"line-through"}}>₹ {netPrice}</span></p>
                
                <div className="card__ratings">
                    {parseInt(ratings)}<AiFillStar color="#2563EB" size={20}/>
                </div>
                {inStock && <p style={{color:"orange"}}>Ony few Left! </p>} 
                {!inStock && <p>Out of Stock</p>}
                <span style={{display:"inline-flex"}}>Delivery : {fastDelivery ?(<div>Fast Delivery</div>) : (<div>2 days minimum</div>)}</span> 
            
               
            </div>       
          </div>
        
    )
}
export default Card
