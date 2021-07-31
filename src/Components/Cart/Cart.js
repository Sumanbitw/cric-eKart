import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./cart.module.css";
import Loader from "react-loader-spinner";
import "./cart.css";
import StripeCheckout from "react-stripe-checkout";
import { useAuth } from "../../context/authContext";
import ShowCart from "./ShowCart";
require("dotenv/config");

function Cart() {
  const {
    state: { cart },
  } = useCart();
  const [product, setProduct] = useState({ price: 0 });
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    (async function getItemsInCart() {
      try {
        const response = await axios.get(
          `https://crickart.herokuapp.com/cart/${user._id}`
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function getPrice() {
    let total = 0;
    cart && cart.map((item) => (total = total + item.price * item.quantity));
    return total;
  }

  const makePayment = async (token) => {
    setProduct(getPrice());
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`https://crickart.herokuapp.com/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const status = response.status;
        setStatus(true);
        setLoading(true);
      })
      .catch((error) => console.log(error));
  };
  console.log(status);

  return (
    <>
      {loading ? (
        <Loader
          type="ThreeDots"
          color="#2563EB"
          secondaryColor="grey"
          height={100}
          width={100}
          timeout={1000}
        />
      ) : (
        <div className="cart__products">
          <h1>Welcome {user?.name}</h1>
          {cart && cart.length === 0 ? (
            <div className="cart__items">
              <div className="img"></div>
              <p style={{ fontSize: "20px", margin: "1rem", color: "grey" }}>
                Add items in cart
              </p>
              <button
                className="btn-secondary"
                onClick={() => navigate("/products")}
              >
                Add Items
              </button>
            </div>
          ) : (
            <p style={{ fontSize: "25px" }}>My Cart :{cart.length && cart.length}</p>
          )}

          <div className="cart__header">
            {cart.length!==0 &&
              cart.map((cartItem) => (
                <ul>
                  <ShowCart cartItem={cartItem} status={status} />
                </ul>
              ))}
          </div>
          {cart.length !== 0 && (
            <div className="cart__checkout">
              <div className="checkout">
                <h1>Checkout</h1>
                {!status && (
                  <div className="checkout__container">
                    <p>Price </p>
                    <span> ₹ {getPrice()}</span>
                  </div>
                )}
              </div>
              <StripeCheckout
                stripeKey="pk_test_51JFbnxSFTrlP9uSUwtHbNQkyvRasaD9McNL135MVwIxMjFd9JhaKtKmWgSwaM88tT4hBvY7NxbNrtfFt2UwsfamD000QAdeov8"
                token={makePayment}
                name="Buy Product"
                amount={product.price}
              >
                <button className="btn-secondary">
                  {!status
                    ? `Checkout with stripe ₹ ${getPrice()}`
                    : `Payment Successfull`}
                </button>
              </StripeCheckout>
            </div>
          )}
        </div>
      )}
      {status && (
        <div className="payment__container">
          <div className="payment">Payment Successfull</div>
          <Link to="/products">
            <button className="btn-secondary">Add Items</button>
          </Link>
        </div>
      )}
    </>
  );
}
export default Cart;
