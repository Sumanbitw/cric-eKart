import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import Card from "../../pages/Card/Card";
import axios from "axios";
import "./product.css";
import { useCart } from "../../context/cartContext";
import { MdSort } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import Loader from "react-loader-spinner";
import Sidebar from "../Sidebar/Sidebar";
// import { getFilteredData } from "./FilterData";

function ProductListing() {
  const [loading, setLoading] = useState(true);
  const {
    state,
    dispatch
  } = useCart();

  useEffect(() => {
    (async function () {
      try {
        const result = await axios.get(
          "https://crickart.herokuapp.com/product"
        );
        setLoading(false);
        dispatch({ type: "SET__PRODUCTS", payload: result.data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  function getSortedData(products, sortBy) {
    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return products.sort((a, b) => a["price"] - b["price"]);
    }
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return products.sort((a, b) => b["price"] - a["price"]);
    }
    return products;
  }

  function getFilteredData(state, products) {
    console.log(products)
      let filteredProducts = [...products]
      filteredProducts =
      filteredProducts
        .filter((item) =>
          state.showFastDeliveryOnly ? item.fastDelivery : true
        )
        .filter((item) => (state.showInventoryAll ? true : item.inStock))
        .filter((item) => parseInt(item.price) <= state.maxValue)

        if(state.categories.length !== 0){
          filteredProducts = filteredProducts.filter(item => state.categories.includes(item.category))
        }

        if(state.ratings.length !== 0){
          filteredProducts = filteredProducts.filter(item => state.ratings.includes(parseInt(item.ratings)))
        }
      return filteredProducts 
  }
  const sortedData = getSortedData(state.products, state.sortBy);
  const filteredData = getFilteredData(state, sortedData);

  console.log(sortedData)
  console.log(filteredData)

  return (
    <>
      <div className="app">
        {loading ? (
          <Loader
            type="ThreeDots"
            color="#2563EB"
            secondaryColor="grey"
            height={100}
            width={100}
            timeout={10000}
          />
        ) : (
          <>
            <div className="app-component">
              <Sidebar
                sortBy={state.sortBy}
                showInventoryAll={state.showInventoryAll}
                showFastDeliveryOnly={state.showFastDeliveryOnly}
                maxValue={state.maxValue}
                ratings={state.ratings}
              />
            </div>
            <div className="sort__filter">
              <span
                style={{
                  borderRight: "2px solid grey",
                  width: "34vw",
                  fontSize: "18px",
                  margin: "0 22px",
                }}
              >
                Sort By
                <MdSort size={20} style={{ margin: "0 10px" }} />
              </span>
              <span style={{ fontSize: "18px" }}>
                Filter
                <FiFilter size={20} style={{ margin: "0 10px" }} />
              </span>
            </div>
            <div className="app-cart">
              {filteredData.length > 0 &&
                filteredData.map((item) => (
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
                    ratings={item.ratings}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductListing;
