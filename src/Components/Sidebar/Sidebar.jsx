import React from 'react'
import "./sidebar.css"

function Sidebar({
    dispatch,
    sortBy,
    showInventoryAll,
    showFastDeliveryOnly,
    maxValue
}) {
    return (
        <>
        <div className="app-sidebar">
            <li className="sidebar__links">
                <input
                type="range"
                min="100"
                max="10000"
                value={maxValue}
                id="myRange"
                className="sidebar__input"
                onChange={(e) => {
                    dispatch({
                      type: "TOGGLE_PRICE_RANGE",
                      payload: e.target.value,
                    });
                }}
                />
                <p>
                    Value: <span id="demo">₹{maxValue}</span>
                </p>
            </li>
            
            <legend>
                Sort By
            </legend>

            <li className="sidebar__links">
                <input 
                type="radio" 
                name="sort" 
                className="sidebar__input"
                checked={sortBy && sortBy ==="PRICE_LOW_TO_HIGH"} 
                onChange={() => dispatch({ type:"sort",payload:"PRICE_LOW_TO_HIGH" })}
                />
                    <span>
                        Price - Low to High
                    </span>
            </li> 

            <li className="sidebar__links">
                <input  
                type="radio" 
                name="sort"
                className="sidebar__input" 
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"} 
                onChange={() =>dispatch({ type:"sort",payload:"PRICE_HIGH_TO_LOW" })}
                />
                Price - High to Low
            </li>
        
        
            <legend>
                Filter
            </legend>

            <li className="sidebar__links">
                <input 
                type="checkbox"
                className="sidebar__input" 
                checked={showInventoryAll} 
                onChange={() => dispatch({ type:"TOGGLE_INVENTORY" })}
                />
                Out of stock
            </li>

            
            <li className="sidebar__links">
                <input  
                type="checkbox" 
                className="sidebar__input"
                checked={showFastDeliveryOnly} 
                onChange={() => dispatch({ type:"TOGGLE_DELIVERY" })}
                />
                Fast Delivery
            </li>

            <legend>
                Ratings
            </legend>

            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                5<img src="https://img.icons8.com/material-rounded/16/000000/star.png" alt=""/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                4<img src="https://img.icons8.com/material-rounded/16/000000/star.png" alt=""/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                3<img src="https://img.icons8.com/material-rounded/16/000000/star.png" alt=""/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                2<img src="https://img.icons8.com/material-rounded/16/000000/star.png" alt=""/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                1<img src="https://img.icons8.com/material-rounded/16/000000/star.png" alt=""/> & above 
            </li>
        </div>
        </>
    
    )
}

export default Sidebar

