import React, { useReducer, useState } from 'react'
import { useEffect} from "react";
import Card from "../../pages/Card/Card"
import axios from "axios";
import "./product.css"
import { useCart } from '../../context/cartContext';
import {MdSort} from "react-icons/md"
import {FiFilter} from "react-icons/fi"
import Loader from "react-loader-spinner"

function ProductListing() {
    // const {products,setProducts} = useCart()
    const [loading, setLoading] = useState(true)
    const { state : { products, showFastDeliveryOnly, showInventoryAll, sortBy }, dispatch } = useCart()
    
    useEffect(() => {
        (async function () {
          try {
            const result = await axios.get("https://crickart.herokuapp.com/product");
            setLoading(false)
            // setProducts(result.data);
            dispatch({ type : "SET__PRODUCTS", payload : result.data })
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);

      // const [{showInventoryAll,showFastDeliveryOnly,sortBy}, dispatch] = useReducer(function reducer(state,action){
      //   switch(action.type){
      //     case "TOGGLE_INVENTORY":
      //       return (state = {
      //         ...state,
      //         showInventoryAll : !state.showInventoryAll
      //       })
      //       case "TOGGLE_DELIVERY" :
      //         return (state = {
      //           ...state,
      //           showFastDeliveryOnly : !state.showFastDeliveryOnly
      //         })
      //       case "sort":
      //         return {
      //           ...state,
      //           sortBy : action.payload
      //       }
      //       default :
      //       return state
      //   }
      // },{
      //   showInventoryAll : true,
      //   showFastDeliveryOnly: false,
      //   sortBy : null
      // })

      function getSortedData(products,sortBy){
        if(sortBy && sortBy === "PRICE_LOW_TO_HIGH"){
          return products.sort((a,b) => a["price"] - b["price"])
        }
        if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
          return products.sort((a,b) => b["price"] - a["price"])
        }
        return products
      }

      function getFilteredData(products , {showFastDeliveryOnly, showInventoryAll}){
        return products && products.filter(({fastDelivery}) => 
          showFastDeliveryOnly ? fastDelivery : true 
          )
          .filter(({inStock}) => 
          showInventoryAll ? true : inStock
          )
      }
      const sortedData = getSortedData(products,sortBy)
      const filteredData = getFilteredData(sortedData, {showFastDeliveryOnly, showInventoryAll})
  
    return (
      <>
            <div className="app">
            { loading ? ( <Loader

                type="ThreeDots"
                color="#2563EB"
                secondaryColor="grey"
                height={100}
                width={100}
                timeout={10000} 
              /> ) : (
                <>
            <div className="app-component">
              <div className="app-sidebar">
                  <legend style={{borderBottom:"1px solid grey",margin :"1rem 0", paddingBottom:"1rem",fontSize:"18px"}}>Sort By</legend>
                  <label style={{fontSize:"15px"}}>
                    <input style={{margin:"0 1rem"}} type="radio" name="sort" checked={sortBy && sortBy ==="PRICE_LOW_TO_HIGH"} onChange={() => dispatch({type:"sort",payload:"PRICE_LOW_TO_HIGH"})}/>
                      Price - Low to High
                  </label> <br/>

                  <label style={{fontSize:"15px"}}>
                    <input style={{margin: " 0 1rem"}} type="radio" name="sort" checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"} onChange={() =>dispatch({type:"sort",payload:"PRICE_HIGH_TO_LOW"})}/>
                      Price - High to Low
                  </label>
                
              
                  <legend style={{margin:"2rem 0",borderBottom:"1px solid grey",fontSize:"18px", paddingBottom:"1rem"}}>Filter</legend>
                  <label style={{fontSize:"15px"}}>
                    <input style={{margin : "0 1rem"}} type="checkbox" checked={showInventoryAll} onChange={() => dispatch({type:"TOGGLE_INVENTORY"})}/>
                    Include out of stock
                  </label><br/>

                 
                  <label style={{fontSize:"15px",marginLeft:"-3.4rem"}}>
                    <input style={{margin:"0 1rem"}} type="checkbox" checked={showFastDeliveryOnly} onChange={() => dispatch({type:"TOGGLE_DELIVERY"})}/>
                    Fast Delivery
                  </label>
              </div>
          </div>
          <div className="sort__filter">
              <span style={{borderRight:"2px solid grey",width:"34vw",fontSize:"18px",margin:"0 22px"}}>Sort By
              <MdSort size={20} style={{margin:"0 10px"}}/>
              </span>
              <span style={{fontSize:"18px"}}>Filter
                <FiFilter size={20} style={{margin:"0 10px"}}/>
              </span>
              </div>
            <div className="app-cart">
              
                {filteredData && filteredData
                .map((item) => (
                <Card 
                id={item._id}
                item={item} 
                title={item.title} 
                imageURL={item.imageURL} 
                category={item.category}
                price={item.price}
                inStock={item.inStock}
                fastDelivery={item.fastDelivery}
                discount={item.discount}
                netPrice={item.netPrice}
                />
                  ))}
              </div>
              </>
              )}
            </div>
            </>
    )
}

export default ProductListing
