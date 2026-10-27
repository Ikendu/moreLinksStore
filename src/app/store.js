import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem(
      "electronics_store_cart",
      JSON.stringify(store.getState().cart.items),
    );
  } catch (error) {
    console.error("Unable to save cart:", error);
  }
});
