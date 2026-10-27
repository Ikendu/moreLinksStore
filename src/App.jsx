import { useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

export default function App() {
  const [page, setPage] = useState("products");

  if (page === "cart") {
    return (
      <Cart
        onContinueShopping={() => setPage("products")}
        onCheckout={() => setPage("checkout")}
      />
    );
  }

  if (page === "checkout") {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="mt-3 text-slate-600">
            Next we'll add customer details, delivery information, order
            creation, and payment.
          </p>
          <button
            onClick={() => setPage("cart")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">
            Return to cart
          </button>
        </div>
      </main>
    );
  }

  return <Products onOpenCart={() => setPage("cart")} />;
}
