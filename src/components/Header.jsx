import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";

export default function Header({ search, setSearch }) {
  const navigate = useNavigate();
  const itemCount = useSelector(selectCartCount);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-2xl font-black tracking-tight">
          <span className="text-blue-600">MoreLinks</span> Store
        </button>

        <div className="order-3 w-full sm:order-none sm:max-w-md sm:flex-1">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>

          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search laptops, phones, brands..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
          🛒 Cart ({itemCount})
        </button>
      </div>
    </header>
  );
}
