import { useNavigate } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productService";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { selectCartCount } from "../features/cart/cartSlice";
import Header from "../components/Header";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price));

export default function Products({ onOpenCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartCount);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = ["All", "Laptops", "Smartphones"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category?.toLowerCase() === category.toLowerCase();

      const searchText = search.toLowerCase();

      const matchesSearch = [
        product.name,
        product.brand,
        product.category,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchText),
      );

      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section */}
        <section className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-white sm:px-10 sm:py-16">
          <div className="max-w-2xl">
            <p className="mb-4 font-semibold uppercase tracking-widest text-blue-300">
              Your trusted tech store
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              Find your next
              <span className="text-blue-400"> favourite device.</span>
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              Shop quality laptops and smartphones at competitive prices. Choose
              new devices or carefully selected USA-used options.
            </p>

            <a
              href="#products"
              className="mt-7 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-500">
              Explore products →
            </a>
          </div>
        </section>

        {/* Category filters */}
        <section className="py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Browse our collection
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Shop by category
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2.5 font-semibold transition ${
                  category === item
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-600"
                }`}>
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Product list */}
        <section id="products" className="pb-12">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Featured products</h2>
            {!loading && (
              <span className="text-sm text-slate-500">
                {filteredProducts.length} products
              </span>
            )}
          </div>

          {loading && (
            <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-sm">
              Loading products...
            </div>
          )}

          {error && !loading && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <p className="font-semibold">Unable to load products</p>
              <p className="mt-1 text-sm">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-semibold">No products found</p>
              <p className="mt-2 text-slate-500">
                Try another search term or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-4 font-semibold text-blue-600 hover:underline">
                Clear filters
              </button>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const isUsed = ["usa used"].includes(
                  String(product.condition_type || "").toLowerCase(),
                );
                const isUKUsed = ["uk used"].includes(
                  String(product.condition_type || "").toLowerCase(),
                );

                const conditionLabel = isUsed
                  ? "USA used"
                  : product.condition_type || "New";

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-100 p-5">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-6xl">💻</span>
                      )}

                      <span
                        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                          isUsed
                            ? "bg-amber-50 text-emerald-800"
                            : isUKUsed
                              ? "bg-amber-100 text-emerald-800"
                              : "bg-emerald-100 text-emerald-800"
                        }`}>
                        {conditionLabel}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        {product.category || "Electronics"}
                      </p>

                      <h3 className="mt-2 min-h-12 text-lg font-bold leading-6">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Brand: {product.brand || "Not specified"}
                      </p>

                      <p className="mt-4 text-2xl font-black text-slate-900">
                        {formatPrice(product.price)}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {Number(product.stock_quantity) > 0
                          ? `${product.stock_quantity} in stock`
                          : "Out of stock"}
                      </p>

                      <button
                        type="button"
                        disabled={Number(product.stock_quantity) < 1}
                        onClick={() => dispatch(addToCart(product))}
                        className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                        {Number(product.stock_quantity) > 0
                          ? "Add to cart"
                          : "Out of stock"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} ElectroStore. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
