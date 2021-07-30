import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
import { useCart } from "../../context/cartContext";

function ShowCart({ cartItem, status }) {
  const {
    state: { wishlist },
    dispatch,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const itemsInWishlist = () =>
    wishlist &&
    wishlist.find((wishlistItem) => wishlistItem._id === cartItem._id);

  const increaseItemQuantity = async () => {
    try {
      console.log(user._id, cartItem._id);
      const response = await axios.patch(
        `https://crickart.herokuapp.com/cart/${user._id}/${cartItem._id}`,
        {
          quantity: cartItem.quantity + 1,
        }
      );
      console.log(response.data);
      dispatch({ type: "INCREASE__QUANTITY", payload: cartItem });
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseItemQuantity = async () => {
    try {
      console.log(user._id, cartItem._id);
      const response = await axios.patch(
        `https://crickart.herokuapp.com/cart/${user._id}/${cartItem._id}`,
        {
          quantity: cartItem.quantity - 1,
        }
      );
      console.log(response.data);
      dispatch({ type: "DECREASE__QUANTITY", payload: cartItem });
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async () => {
    const response = await axios.delete(
      `https://crickart.herokuapp.com/cart/${user._id}/${cartItem._id}`
    );
    console.log(response.data);
    dispatch({ type: "REMOVE__ITEM__FROM__CART", payload: cartItem });
  };

  const wishListToCart = async (cartItem) => {
    console.log("clicked");
    try {
      const response = await axios.post(
        "https://crickart.herokuapp.com/wishlist",
        {
          userId: user._id,
          productId: cartItem._id,
        }
      );
      console.log(response);
      dispatch({ type: "ADD__TO__WISHLIST", payload: cartItem });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(status);
    if (status) {
      (async function () {
        await axios.delete(
          `https://crickart.herokuapp.com/cart/${user._id}/${cartItem._id}`
        );
        dispatch({ type: "REMOVE__ITEM__FROM__CART", payload: cartItem });
      })();
    }
  }, [status]);

  return (
    <>
      <div className="cart__container" key={cartItem._id}>
        <div className="cart__list">
          <img src={cartItem.imageURL[0]} alt="image" className="cart__img" />
        </div>
        <div className="cart__name">
          <span className="cart__title">{cartItem.title}</span>
          <br />
          <span className="cart__price">
            ₹<b>{cartItem.price}</b>
          </span>
          <br />
          <div className="btn__qty">
            <button
              onClick={increaseItemQuantity}
              style={{ marginRight: "10px", padding: "3px 5px" }}
            >
              +
            </button>
            <span>Quantity : {cartItem.quantity}</span>
            <button
              onClick={decreaseItemQuantity}
              style={{ marginLeft: "10px", padding: "3px 5px" }}
              disabled={cartItem.quantity === 1 ? true : false}
            >
              -
            </button>
          </div>
          <div className="buttons">
            <button
              onClick={removeItem}
              className="btn-primary btn__remove btn__bg"
            >
              Remove
            </button>
            {!itemsInWishlist() ? (
              <button
                onClick={() => wishListToCart(cartItem)}
                className="btn-primary btn__bag btn__bg"
              >
                Wishlist
              </button>
            ) : (
              <button
                onClick={() => navigate("/wishlist")}
                className="btn-primary btn__bag btn__bg"
              >
                Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowCart;
