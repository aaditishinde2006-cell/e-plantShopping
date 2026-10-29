
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const totalAmount = cart.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    window.alert("Checkout Coming Soon!");
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Continue shopping to add plants!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.cost.toFixed(2)}</p>
                <p>
                  Item Total: $
                  {(item.cost * item.quantity).toFixed(2)}
                </p>

                <button onClick={() => handleDecrement(item)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => handleIncrement(item)}>
                  +
                </button>

                <button
                  className="delete-button"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>

          <button onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}

      <button
        className="continue-shopping-button"
        onClick={onContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
