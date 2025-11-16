"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { PRODUCTS, BLOGS_VIDEOS } from "../data/products";
import { CATEGORIES } from "../config/constants";

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-[var(--color-gold)] via-[var(--color-gold-dark)] to-[var(--color-accent)] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1600"
              alt="Farming background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold-light)] rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

          <div className="relative max-w-7xl mx-auto px-4 py-20 text-white z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fadeIn">
                {currentLang === "hi"
                  ? "विश्वसनीय कृषि रसायन और कृषी उत्पाद"
                  : currentLang === "mr"
                  ? "विश्वासार्ह शेती रसायने आणि कृषी उत्पादने"
                  : "Premium Agricultural Solutions for Modern Farmers"}
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95">
                {currentLang === "hi"
                  ? "किसानों को गुणवत्तापूर्ण इनपुट, सलाह और बाज़ार जानकारी से जोड़ना"
                  : currentLang === "mr"
                  ? "शेतकऱ्यांना दर्जेदार इनपुट, सल्ला आणि बाजार माहितीशी जोडणे"
                  : "Empowering farmers with quality products, expert advice, and market insights to maximize yield and income."}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="bg-white text-[var(--color-gold-dark)] px-8 py-4 rounded-[var(--radius-sm)] font-bold hover:shadow-elevated hover:scale-105 transition-all"
                >
                  {currentLang === "hi"
                    ? "उत्पाद देखें"
                    : currentLang === "mr"
                    ? "उत्पादने पहा"
                    : "Explore Products →"}
                </a>
                <a
                  href="#blogs"
                  className="border-2 border-white text-white px-8 py-4 rounded-[var(--radius-sm)] font-bold hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  {currentLang === "hi"
                    ? "ब्लॉग और वीडियो"
                    : currentLang === "mr"
                    ? "ब्लॉग आणि व्हिडिओ"
                    : "Learn More"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="bg-white py-8 shadow-card sticky top-[73px] z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={
                    currentLang === "hi"
                      ? "🔍 उत्पाद खोजें..."
                      : currentLang === "mr"
                      ? "🔍 उत्पादने शोधा..."
                      : "🔍 Search products..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-[var(--color-cream)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--color-gold)] transition-colors text-lg"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 border-2 border-[var(--color-cream)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--color-gold)] transition-colors font-medium text-lg bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 bg-[var(--color-light)]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                {currentLang === "hi"
                  ? "✨ विशेष उत्पाद"
                  : currentLang === "mr"
                  ? "✨ विशेष उत्पादने"
                  : "✨ Premium Products"}
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
                {currentLang === "hi"
                  ? "उच्च गुणवत्ता वाले कृषि उत्पादों का हमारा चयनित संग्रह"
                  : currentLang === "mr"
                  ? "उच्च दर्जाच्या शेती उत्पादनांचा आमचा निवडलेला संग्रह"
                  : "Our curated collection of high-quality agricultural solutions"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={currentLang}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Blogs & Videos Section */}
        <section id="blogs" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                {currentLang === "hi"
                  ? "📺 ब्लॉग और वीडियो"
                  : currentLang === "mr"
                  ? "📺 ब्लॉग आणि व्हिडिओ"
                  : "📺 Educational Content"}
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
                {currentLang === "hi"
                  ? "विशेषज्ञ सलाह और कृषि तकनीकों के बारे में जानें"
                  : currentLang === "mr"
                  ? "तज्ञांचे सल्ले आणि शेती तंत्रांबद्दल जाणून घ्या"
                  : "Learn from expert advice and modern farming techniques"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOGS_VIDEOS.map((media) => (
                <div key={media.id} className="card group overflow-hidden">
                  <div className="relative pb-[56.25%] overflow-hidden">
                    <iframe
                      src={media.url}
                      title={media.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-gold)] transition-colors text-lg">
                      {currentLang === "hi"
                        ? media.titleHi
                        : currentLang === "mr"
                        ? media.titleMr
                        : media.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
