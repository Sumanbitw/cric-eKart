import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { useCart } from '../../context/cartContext'
import Loader from "react-loader-spinner"
import { Link } from "react-router-dom"
import "./cardDetails.css"


function CardDetails() {
    const [productDetails, setProductDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState("0")
    const [isAdded, setIsAdded] = useState(true)
    const {itemsInCart, setItemsInCart} = useCart()
    
    function addToCart(productDetails){
        console.log({productDetails})
        let inCart = false;
        setIsAdded(prev => !prev)
        setItemsInCart(itemsInCart.map(currItems => {
            if(currItems.id=== productDetails._id) {
                inCart = true
                return {
                    ...currItems,
                    quantity: currItems.quantity+1
                }
            }
            return currItems
        }))
        if(!inCart){
            setItemsInCart([...itemsInCart,{productDetails,quantity:1}])
        }
    }

    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        (async function () {
          try {
            const result = await axios.get(`https://evening-woodland-75481.herokuapp.com/product/${id}`);
            setLoading(false)
            setProductDetails(result.data);
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);

      function handleClick(id) {
          console.log("clicked",id)
            setImage(id)
      }

    return (
        <div className="cardDetails">
            {loading && <Loader
                type="ThreeDots"
                color="#2563EB"
                height={100}
                width={100}
                timeout={3000} 
                style={{margin : "0 20rem"}}
              />}
            <div className="cardDetails__left">
                <img src={productDetails && productDetails.imageURL[image]} className="cd__img"/>
                <div className="cardDetails__img" >{productDetails && productDetails.imageURL.map((item,id) => (
                    <ul>
                        <img src = {item} className="img" onClick={() => handleClick(id)}/>
                    </ul>
                ))}
                </div>
                { isAdded ? 
                <button 
                    className="btn button-primary" 
                    onClick={()=>addToCart(productDetails)}>
                    <i className="fa fa-shopping-cart"> 
                    Add to Cart </i>
                    </button> : 
                    <Link to="/cart">
                    <button 
                    className="btn button-primary">
                    <i className="fa fa-shopping-cart"> 
                    Go to Cart </i>
                    </button>
                    </Link>}
            </div>
            <div className="cardDetails__right">
                <p className="cardDetails__title">{productDetails && productDetails.title}</p> 
                 <div className="cardDetails__details">{productDetails && productDetails.details.map(item => (
                     <ul>
                         <li>{item}</li>
                     </ul>
                 ))}</div>
                
                <p className="cardDetails__price">  {productDetails && productDetails.price} </p> 
            </div>
        </div>
    )
}

export default CardDetails
