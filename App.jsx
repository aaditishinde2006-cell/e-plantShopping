
import React, { useState } from "react";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import "./App.css";

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setShowAboutUs(false);
    setShowCart(false);
  };

  const handleHome = () => {
    setShowProductList(false);
    setShowAboutUs(false);
    setShowCart(false);
  };

  const handleAboutUs = () => {
    setShowProductList(false);
    setShowAboutUs(true);
    setShowCart(false);
  };

  const handleCart = () => {
    setShowProductList(false);
    setShowAboutUs(false);
    setShowCart(true);
  };

  return (
    <div className="app-container">
      {!showProductList && !showAboutUs && !showCart && (
        <div className="background-image">
          <div>
            <h1>Welcome To Paradise Nursery</h1>
            <p>Bring nature home, one plant at a time.</p>

            <button onClick={handleGetStarted}>
              Get Started
            </button>

            <button onClick={handleAboutUs}>
              About Us
            </button>
          </div>
        </div>
      )}

      {(showProductList || showAboutUs || showCart) && (
        <nav className="navbar">
          <strong>Paradise Nursery</strong>

          <div>
            <button onClick={handleHome}>Home</button>
            <button onClick={handleGetStarted}>Plants</button>
            <button onClick={handleCart}>Cart</button>
          </div>
        </nav>
      )}

      {showAboutUs && <AboutUs />}

      {showProductList && (
        <ProductList onOpenCart={handleCart} />
      )}

      {showCart && (
        <CartItem onContinueShopping={handleGetStarted} />
      )}
    </div>
  );
}

export default App;
