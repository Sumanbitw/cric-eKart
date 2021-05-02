import React from 'react'
import { Link } from "react-router-dom"
import "./home.css"

function Home() {
    return (
        <div className="home">
            <img src="https://www.onlinecricstore.com/media/wysiwyg/Desktop.jpg" alt="" className="home__image"/>
            <img src="https://www.onlinecricstore.com/media/wysiwyg/Phone.jpg" style={{display:"none"}} alt="" className="home__image"/>
            <p> CricKart - India's largest online cricket store</p>
            <div className="home__card">
                <Link to="/products ">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-1.jpg" alt="cicket bats" className="card__img"/>
                </Link>
                <Link to="/products">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-2.jpg" alt="cicket gloves" className="card__img"/>
                </Link>
                <Link to="/products">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-3.jpg" alt="cicket pads" className="card__img"/>
                </Link>
                <Link to="/products">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-4.jpg" alt="cicket clothing" className="card__img"/>
                </Link>
                <Link to="/products">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-5.jpg" alt="cicket footwear" className="card__img"/>
                </Link>
                <Link to="/products">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-6.jpg" alt="cicket accessories" className="card__img"/>
                </Link>
                <Link to="/products">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-7.jpg" alt="cicket balls" className="card__img"/>
                </Link>
                <Link to="/products">
                <img src="https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-8.jpg" alt="cicket kit" className="card__img"/>
                </Link>
            </div>
            <p>SHOP BY BRANDS</p>
            <div className="home__brands"> 
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/sg-logo.png" alt="sg"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/dsc-fearless-logo.png"  alt="dsc"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/adidas-logo.png" alt="adidas"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/gm-logo.png" alt="gm"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/kookaburra-loho.png" alt="kookaburra"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/ss-logo.png" alt="ss"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/spartan-logo.png" alt="spartan"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/new-balance-logo.png" alt="nb"/>
                </li>
                <li>
                    <img src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/bas-logo.png" alt="bas"/>
                </li>
            </div>
        </div>
        
    )
}

export default Home
