import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>

        <p className="mt-3 text-slate-600">
          Enter your delivery details and complete your order here.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/cart"
            className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-800">
            Back to Cart
          </Link>

          <Link
            to="/"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
