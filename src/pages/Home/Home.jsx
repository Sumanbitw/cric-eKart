import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import "./home.css";

function Home() {
  const categoriesData = [
    {
      cid: 1,
      categoryName: "bat",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-1.jpg",
      alt: "cricket bats",
    },
    {
      cid: 2,
      categoryName: "gloves",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-2.jpg",
      alt: "cricket gloves",
    },
    {
      cid: 3,
      categoryName: "pads",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-3.jpg",
      alt: "cricket pads",
    },
    {
      cid: 4,
      categoryName: "clothing",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-4.jpg",
      alt: "cricket clothing",
    },
    {
      cid: 5,
      categoryName: "shoes",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-5.jpg",
      alt: "cricket footwear",
    },
    {
      cid: 6,
      categoryName: "accessories",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-6.jpg",
      alt: "cricket accessories",
    },
    {
      cid: 7,
      categoryName: "ball",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-7.jpg",
      alt: "cricket balls",
    },
    {
      cid: 8,
      categoryName: "accessories",
      categoryImage:
        "https://www.onlinecricstore.com/media/wysiwyg/home_category/cric-8.jpg",
      alt: "cricket kit",
    },
  ];
  const { dispatch } = useCart();
  return (
    <div className="home">
      <Link to="/products">
        <img
          src="https://www.onlinecricstore.com/media/wysiwyg/Desktop.jpg"
          alt=""
          className="home__image"
        />
      </Link>
      <img
        src="https://www.onlinecricstore.com/media/wysiwyg/Phone.jpg"
        style={{ display: "none" }}
        alt=""
        className="home__image"
      />
      <p> CricKart - India's largest online cricket store</p>
      <div className="home__card">
        {categoriesData.map((category) => {
          return (
            <>
              <Link to="/products ">
                <img
                  src={category.categoryImage}
                  alt={category.alt}
                  className="card__img"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE__CATEGORY",
                      payload: category.categoryName,
                    })
                  }
                />
              </Link>
            </>
          );
        })}
        {/* <Link to="/products ">
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
                </Link> */}
      </div>
      <p>SHOP BY BRANDS</p>
      <div className="home__brands">
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/sg-logo.png"
            alt="sg"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/dsc-fearless-logo.png"
            alt="dsc"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/adidas-logo.png"
            alt="adidas"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/gm-logo.png"
            alt="gm"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/kookaburra-loho.png"
            alt="kookaburra"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/ss-logo.png"
            alt="ss"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/spartan-logo.png"
            alt="spartan"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/new-balance-logo.png"
            alt="nb"
          />
        </li>
        <li>
          <img
            src="https://www.onlinecricstore.com/media/wysiwyg/Home_Page/bas-logo.png"
            alt="bas"
          />
        </li>
      </div>
    </div>
  );
}

export default Home;
