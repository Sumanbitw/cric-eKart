import React, { useReducer, useState } from 'react'
import { useEffect} from "react";
import Card from "../../pages/Card/Card"
import axios from "axios";
import "./product.css"
import { useCart } from '../../context/cartContext';
import {MdSort} from "react-icons/md"
import {FiFilter} from "react-icons/fi"
import Loader from "react-loader-spinner"
import Sidebar from '../Sidebar/Sidebar';

function ProductListing() {
    const [loading, setLoading] = useState(true)
    const { state : { products, showFastDeliveryOnly, showInventoryAll, sortBy, maxValue }, dispatch } = useCart()
    
    useEffect(() => {
        (async function () {
          try {
            const result = await axios.get("https://crickart.herokuapp.com/product");
            setLoading(false)
            dispatch({ type : "SET__PRODUCTS", payload : result.data })
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);

      function getSortedData(products,sortBy){
        if(sortBy && sortBy === "PRICE_LOW_TO_HIGH"){
          return products.sort((a,b) => a["price"] - b["price"])
        }
        if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
          return products.sort((a,b) => b["price"] - a["price"])
        }
        return products
      }

      function getFilteredData(products , {showFastDeliveryOnly, showInventoryAll, maxValue}){
        return products && products.filter(({fastDelivery}) => 
          showFastDeliveryOnly ? fastDelivery : true 
          )
          .filter(({inStock}) => 
          showInventoryAll ? true : inStock
          )
          .filter(item => parseInt(item.price) <= maxValue)
      }
      const sortedData = getSortedData(products,sortBy)
      const filteredData = getFilteredData(sortedData, 
        {
          showFastDeliveryOnly, 
          showInventoryAll,
          maxValue
        })

        console.log(filteredData && filteredData)
  
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
              <Sidebar 
              dispatch={dispatch} 
              sortBy={sortBy} 
              showInventoryAll={showInventoryAll}
              showFastDeliveryOnly={showFastDeliveryOnly}
              maxValue={maxValue}
              />
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
