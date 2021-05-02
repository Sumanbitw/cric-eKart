import React, { useState } from 'react'
import { useCart } from '../../context/cartContext'
import { AiOutlineHeart } from "react-icons/ai"
import { Link } from "react-router-dom"
import "./card.css"

function Card ({
    id,
    title,
    imageURL,
    price,
    fastDelivery,
    inStock,
    discount, 
    netPrice
}) {
    const 
    { 
    itemsInCart,
    setItemsInCart,
    wishList,
    setWishList,
    } = useCart()
    const [isAdded, setIsAdded] = useState(true)
    // function addToCart(id){
    //     let inCart = false;
    //     setIsAdded(prev => !prev)
    //     setItemsInCart(itemsInCart.map(currItems => {
    //         if(currItems.id===id) {
    //             inCart = true
    //             return {
    //                 ...currItems,
    //                 quantity: currItems.quantity+1
    //             }
    //         }
    //         return currItems
    //     }))
    //     if(!inCart){
    //         setItemsInCart([...itemsInCart,{id,title,imageURL,price,quantity:1}])
    //     }
    // }

    function addToWishList(id){
        let inCart = false
        setWishList(wishList.map(currItem => {
            if(currItem.id===id){
                inCart = true
                return { 
                    ...currItem,
                    quantity: currItem.quantity + 1
                }
            }
            return currItem
        }))
        if(!inCart){
            setWishList([...wishList,{id,title,imageURL,price,quantity:1}])
        }
    }
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
                
                <div className="wishList__icon"><AiOutlineHeart size={30} onClick={()=> addToWishList(id)}/></div>
                
                {/* <div className="card__ratings"> {⭐</div> */}
                {/* {inStock && <p style={{color:"orange"}}>Ony few Left! </p>}
                {!inStock && <p>Out of Stock</p>}
                <span style={{display:"inline-flex"}}>Delivery : {fastDelivery ?(<div>Fast Delivery</div>) : (<div>2 days minimum</div>)}</span> */}
            
               
            </div>       
          </div>
        
    )
}
export default Card
