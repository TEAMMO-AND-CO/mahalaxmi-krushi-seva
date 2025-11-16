import "../styles/globals.css";

export const metadata = {
  title:
    "Mahalaxmi Krushi Seva Kendra — Farming Chemicals & Agriculture Products",
  description:
    "Trusted agricultural retailer helping farmers buy quality farming chemicals, seeds, and tools.",
  keywords:
    "Farming Chemicals, Agriculture Products, Organic Growth, Farmer Supplies, Mahalaxmi Krushi",
  openGraph: {
    title:
      "Mahalaxmi Krushi Seva Kendra — Farming Chemicals & Agriculture Products",
    description:
      "Trusted agricultural retailer helping farmers buy quality farming chemicals, seeds, and tools.",
    images: ["/ml.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
