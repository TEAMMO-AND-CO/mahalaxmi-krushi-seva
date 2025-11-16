export const APP_CONFIG = {
  deliveryFee: 50,
  freeDeliveryThreshold: 1000,
  pickupStores: [
    { id: 1, name: "Sangli Main Store", address: "Sangli, Maharashtra" },
    { id: 2, name: "Satara Branch", address: "Satara, Maharashtra" },
    { id: 3, name: "Ahmednagar Branch", address: "Ahmednagar, Maharashtra" },
  ],
  paymentMethods: [
    { id: "online", label: "Online Payment", icon: "💳" },
    { id: "cod", label: "Cash on Delivery", icon: "💵" },
    { id: "store", label: "Pay at Store", icon: "🏪" },
  ],
  languages: [
    { code: "en", label: "English", flag: "EN" },
    { code: "mr", label: "मराठी", flag: "मराठी" },
    { code: "hi", label: "हिन्दी", flag: "हिन्दी" },
  ],
};

export const CATEGORIES = [
  "All Products",
  "Fertilizers",
  "Seeds",
  "Pesticides",
  "Tools",
  "Organic",
];
