"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { APP_CONFIG } from "../../config/constants";

export default function Cart() {
  const [currentLang, setCurrentLang] = useState("en");
  const [cart, setCart] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [selectedStore, setSelectedStore] = useState(
    APP_CONFIG.pickupStores[0].id
  );
  const [paymentMethod, setPaymentMethod] = useState("online");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee =
    deliveryOption === "delivery" && subtotal < APP_CONFIG.freeDeliveryThreshold
      ? APP_CONFIG.deliveryFee
      : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    alert("Order placed successfully! (This is a demo)");
    localStorage.removeItem("cart");
    setCart([]);
  };

  const getText = (en, hi, mr) => {
    if (currentLang === "hi") return hi;
    if (currentLang === "mr") return mr;
    return en;
  };

  return (
    <>
      <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gradient mb-8">
          {getText(
            "Your Shopping Cart",
            "आपकी शॉपिंग कार्ट",
            "तुमची शॉपिंग कार्ट"
          )}
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[var(--radius)] shadow-soft">
            <div className="text-6xl mb-6">🛒</div>
            <p className="text-[var(--color-muted)] mb-6 text-lg">
              {getText(
                "Your cart is empty",
                "आपकी कार्ट खाली है",
                "तुमची कार्ट रिकामी आहे"
              )}
            </p>
            <a href="/" className="btn-primary inline-block">
              {getText(
                "Continue Shopping",
                "खरीदारी जारी रखें",
                "खरेदी सुरू ठेवा"
              )}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="card flex gap-6 p-6 group">
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--color-text)] mb-2 text-lg truncate">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-bold text-gradient mb-4">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-[var(--color-cream)] rounded-[var(--radius-sm)] overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-4 py-2 hover:bg-[var(--color-gold)] hover:text-white transition-colors font-bold"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-4 py-2 hover:bg-[var(--color-gold)] hover:text-white transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium transition-colors"
                      >
                        {getText("Remove", "हटाएं", "काढा")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <div className="bg-white p-8 rounded-[var(--radius)] shadow-card h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
                {getText("Order Summary", "ऑर्डर सारांश", "ऑर्डर सारांश")}
              </h2>

              {/* Delivery Option */}
              <div className="mb-6">
                <label className="font-bold block mb-3 text-[var(--color-text)]">
                  {getText(
                    "Delivery Option:",
                    "डिलीवरी विकल्प:",
                    "डिलिव्हरी पर्याय:"
                  )}
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 bg-[var(--color-cream)] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--color-gold)]/10 transition-colors">
                    <input
                      type="radio"
                      value="delivery"
                      checked={deliveryOption === "delivery"}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="mr-3 accent-[var(--color-gold)]"
                    />
                    <span className="font-medium">
                      {getText("Home Delivery", "होम डिलीवरी", "होम डिलिव्हरी")}
                    </span>
                  </label>
                  <label className="flex items-center p-3 bg-[var(--color-cream)] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--color-gold)]/10 transition-colors">
                    <input
                      type="radio"
                      value="pickup"
                      checked={deliveryOption === "pickup"}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="mr-3 accent-[var(--color-gold)]"
                    />
                    <span className="font-medium">
                      {getText("Store Pickup", "स्टोर पिकअप", "स्टोअर पिकअप")}
                    </span>
                  </label>
                </div>
              </div>

              {/* Store Selection */}
              {deliveryOption === "pickup" && (
                <div className="mb-6">
                  <label className="font-bold block mb-3 text-[var(--color-text)]">
                    {getText("Select Store:", "स्टोर चुनें:", "स्टोअर निवडा:")}
                  </label>
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(parseInt(e.target.value))}
                    className="w-full p-3 border-2 border-[var(--color-cream)] rounded-[var(--radius-sm)] focus:border-[var(--color-gold)] outline-none transition-colors"
                  >
                    {APP_CONFIG.pickupStores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name} - {store.address}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Payment Method */}
              <div className="mb-6">
                <label className="font-bold block mb-3 text-[var(--color-text)]">
                  {getText("Payment Method:", "भुगतान विधि:", "पेमेंट पद्धत:")}
                </label>
                <div className="space-y-3">
                  {APP_CONFIG.paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center p-3 bg-[var(--color-cream)] rounded-[var(--radius-sm)] cursor-pointer hover:bg-[var(--color-gold)]/10 transition-colors"
                    >
                      <input
                        type="radio"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 accent-[var(--color-gold)]"
                      />
                      <span className="mr-2">{method.icon}</span>
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="border-t-2 border-[var(--color-cream)] pt-6 space-y-3">
                <div className="flex justify-between text-[var(--color-muted)]">
                  <span>{getText("Subtotal:", "उपयोग:", "उपयोग:")}</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[var(--color-muted)]">
                  <span>
                    {getText(
                      "Delivery Fee:",
                      "डिलीवरी शुल्क:",
                      "डिलिव्हरी शुल्क:"
                    )}
                  </span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-[var(--color-gold)]">
                        {getText("FREE", "मुफ़्त", "मोफत")}
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-2xl border-t-2 border-[var(--color-gold)] pt-4">
                  <span className="text-[var(--color-text)]">
                    {getText("Total:", "कुल:", "एकूण:")}
                  </span>
                  <span className="text-gradient">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-4 text-lg font-bold mt-6"
              >
                {getText(
                  "Confirm Order →",
                  "ऑर्डर की पुष्टि करें →",
                  "ऑर्डर निश्चित करा →"
                )}
              </button>

              <p className="text-xs text-center text-[var(--color-muted)] mt-4">
                ✓ Secure checkout • 100% Safe & Protected
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
