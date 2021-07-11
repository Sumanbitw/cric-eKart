import React from 'react'
import "./sidebar.css"

function Sidebar({
    dispatch,
    sortBy,
    showInventoryAll,
    showFastDeliveryOnly
}) {
    return (

        <div className="app-sidebar">
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
                5<img src="https://img.icons8.com/material-rounded/16/000000/star.png"/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                4<img src="https://img.icons8.com/material-rounded/16/000000/star.png"/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                3<img src="https://img.icons8.com/material-rounded/16/000000/star.png"/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                2<img src="https://img.icons8.com/material-rounded/16/000000/star.png"/> & above 
            </li>

            
            <li className="sidebar__links">
                <input
                type="checkbox"
                className="sidebar__input"
                />
                1<img src="https://img.icons8.com/material-rounded/16/000000/star.png"/> & above 
            </li>
        </div>
    
    )
}

export default Sidebar

