import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "electronics_store_cart";

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    const parsed = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const stock = Number(product.stock_quantity) || 0;

      if (stock <= 0) return;

      const existingItem = state.items.find(
        (item) => String(item.id) === String(product.id),
      );

      if (existingItem) {
        if (existingItem.quantity < stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: Number(product.price),
          image_url: product.image_url,
          condition_type: product.condition_type,
          stock_quantity: stock,
          quantity: 1,
        });
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => String(item.id) === String(action.payload),
      );

      if (item && item.quantity < item.stock_quantity) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => String(item.id) === String(action.payload),
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload),
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors: reusable ways to read cart data from Redux.
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );
