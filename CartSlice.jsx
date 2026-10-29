
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.find(
        (item) => item.name === product.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      return state.filter(
        (item) => item.name !== action.payload
      );
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.find(
        (product) => product.name === name
      );

      if (item) {
        item.quantity = Math.max(0, quantity);
      }

      return state.filter((product) => product.quantity > 0);
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
