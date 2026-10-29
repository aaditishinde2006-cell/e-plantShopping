
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", cost: 18, image: "photo-1501004318641-b39e6451bec6", description: "Easy-care indoor greenery." },
      { name: "Peace Lily", cost: 22, image: "photo-1497250681960-ef046c08a56e", description: "Elegant green leaves." },
      { name: "Spider Plant", cost: 15, image: "photo-1485955900006-10f4d324d411", description: "A popular indoor plant." },
      { name: "Boston Fern", cost: 20, image: "photo-1459156212016-c812468e2115", description: "Lush, feathery foliage." },
      { name: "Areca Palm", cost: 28, image: "photo-1509423350716-97f9360b4e09", description: "A tropical decorative plant." },
      { name: "Aloe Vera", cost: 12, image: "photo-1459411552884-841db9b3cc2a", description: "A succulent with fleshy leaves." },
    ],
  },
  {
    category: "Succulents",
    plants: [
      { name: "Jade Plant", cost: 14, image: "photo-1459411552884-841db9b3cc2a", description: "A compact succulent." },
      { name: "Echeveria", cost: 10, image: "photo-1501004318641-b39e6451bec6", description: "A rosette-shaped succulent." },
      { name: "Haworthia", cost: 11, image: "photo-1485955900006-10f4d324d411", description: "A small, striking succulent." },
      { name: "String of Pearls", cost: 17, image: "photo-1497250681960-ef046c08a56e", description: "A trailing decorative succulent." },
      { name: "Burro's Tail", cost: 16, image: "photo-1459156212016-c812468e2115", description: "A trailing plant with plump leaves." },
      { name: "Zebra Plant", cost: 13, image: "photo-1509423350716-97f9360b4e09", description: "A compact patterned succulent." },
    ],
  },
  {
    category: "Decorative Plants",
    plants: [
      { name: "Monstera", cost: 30, image: "photo-1497250681960-ef046c08a56e", description: "A tropical plant with split leaves." },
      { name: "Fiddle Leaf Fig", cost: 35, image: "photo-1501004318641-b39e6451bec6", description: "A bold statement plant." },
      { name: "Rubber Plant", cost: 25, image: "photo-1485955900006-10f4d324d411", description: "Glossy-leaved indoor greenery." },
      { name: "Calathea", cost: 24, image: "photo-1459156212016-c812468e2115", description: "A decorative foliage plant." },
      { name: "Chinese Money Plant", cost: 19, image: "photo-1509423350716-97f9360b4e09", description: "Rounded leaves on upright stems." },
      { name: "Dracaena", cost: 21, image: "photo-1459411552884-841db9b3cc2a", description: "A versatile indoor plant." },
    ],
  },
];

function ProductList({ onOpenCart }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [addedToCart, setAddedToCart] = useState({});

  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => window.location.reload()}>Home</button>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Plants
        </button>
        <button onClick={onOpenCart}>
          <span role="img" aria-label="Shopping cart">🛒</span>
          Cart <span className="cart_quantity_count">{cartQuantity}</span>
        </button>
      </nav>

      {plantsArray.map((category) => (
        <section key={category.category}>
          <h2>{category.category}</h2>

          <div className="product-list">
            {category.plants.map((plant) => (
              <div className="plant-item" key={plant.name}>
                <img
                  src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=500&q=80`}
                  alt={plant.name}
                />
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <p>${plant.cost.toFixed(2)}</p>

                <button
                  disabled={Boolean(addedToCart[plant.name])}
                  onClick={() => handleAddToCart(plant)}
                >
                  {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
