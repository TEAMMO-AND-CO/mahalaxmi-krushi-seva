"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { PRODUCTS } from "../../../data/products";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("en");
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return <div>Loading...</div>;
  }

  const getName = () => {
    if (currentLang === "hi") return product.nameHi || product.name;
    if (currentLang === "mr") return product.nameMr || product.name;
    return product.name;
  };

  const getDescription = () => {
    if (currentLang === "hi")
      return product.descriptionHi || product.description;
    if (currentLang === "mr")
      return product.descriptionMr || product.description;
    return product.description;
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <>
      <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Media */}
          <div className="space-y-6">
            <div className="relative h-[500px] rounded-[var(--radius)] overflow-hidden shadow-card bg-[var(--color-cream)]">
              <Image
                src={product.image}
                alt={getName()}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {product.video && (
              <div className="relative pb-[56.25%] rounded-[var(--radius)] overflow-hidden shadow-card">
                <iframe
                  src={product.video}
                  title={getName()}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
                {getName()}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gradient">
                  ₹{product.price}
                </span>
                <span className="text-[var(--color-muted)] text-sm">
                  per unit
                </span>
              </div>
            </div>

            <div className="h-px bg-gradient-gold" />

            <p className="text-[var(--color-text)] leading-relaxed text-lg">
              {getDescription()}
            </p>

            {product.benefits && (
              <div className="bg-[var(--color-cream)] p-6 rounded-[var(--radius)] space-y-3">
                <h3 className="font-bold text-lg text-[var(--color-gold)]">
                  {currentLang === "hi"
                    ? "✨ मुख्य लाभ"
                    : currentLang === "mr"
                    ? "✨ मुख्य फायदे"
                    : "✨ Key Benefits"}
                </h3>
                <ul className="space-y-2.5">
                  {product.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[var(--color-text)]"
                    >
                      <span className="text-[var(--color-gold)] mt-1">•</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 bg-white p-6 rounded-[var(--radius)] shadow-soft">
              <label className="font-bold text-[var(--color-text)]">
                {currentLang === "hi"
                  ? "मात्रा:"
                  : currentLang === "mr"
                  ? "प्रमाण:"
                  : "Quantity:"}
              </label>
              <div className="flex items-center bg-[var(--color-cream)] rounded-[var(--radius-sm)] overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 hover:bg-[var(--color-gold)] hover:text-white transition-colors font-bold"
                >
                  −
                </button>
                <span className="px-8 py-3 font-bold text-lg border-x border-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-3 hover:bg-[var(--color-gold)] hover:text-white transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-3 rounded-lg font-semibold"
            >
              {currentLang === "hi"
                ? "कार्ट में जोड़ें"
                : currentLang === "mr"
                ? "कार्टमध्ये जोडा"
                : "Add to Cart"}
            </button>

            <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
              <span className="flex items-center gap-2">✓ Secure Payment</span>
              <span className="flex items-center gap-2">✓ Fast Delivery</span>
              <span className="flex items-center gap-2">
                ✓ Quality Guaranteed
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
