import { Routes, Route, Navigate } from "react-router-dom";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Redirect unknown URLs to the products page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
