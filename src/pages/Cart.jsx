import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
} from "../features/cart/cartSlice";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price));

export default function Cart({ onCheckout }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-300">
          Continue Shopping
        </button>

        <h1 className="text-3xl font-black">Your shopping cart</h1>
        <p className="mt-2 text-slate-500">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-5xl">🛒</p>
            <h2 className="mt-4 text-xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-slate-500">
              Add a laptop or smartphone to get started.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
              Browse products
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <section className="space-y-4 lg:col-span-2">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                  <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-slate-100 p-3 sm:w-32">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-4xl">💻</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.brand} · {item.condition_type}
                    </p>
                    <p className="mt-2 font-bold text-blue-600">
                      {formatPrice(item.price)}
                    </p>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="mt-2 text-sm font-semibold text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      disabled={item.quantity <= 1}
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="h-9 w-9 rounded-lg border border-slate-300 font-bold disabled:opacity-40">
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      disabled={item.quantity >= item.stock_quantity}
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="h-9 w-9 rounded-lg border border-slate-300 font-bold disabled:opacity-40">
                      +
                    </button>
                  </div>

                  <p className="font-bold sm:min-w-32 sm:text-right">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Order summary</h2>

              <div className="mt-5 flex justify-between gap-4 text-slate-600">
                <span>Items ({itemCount})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="mt-3 flex justify-between gap-4 text-sm text-slate-500">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="my-5 border-t border-slate-200" />

              <div className="flex justify-between gap-4 text-lg font-black">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <button
                onClick={onCheckout}
                className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">
                Proceed to checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
