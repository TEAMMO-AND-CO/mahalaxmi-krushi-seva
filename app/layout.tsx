import type { Metadata } from "next";
import ClientRoot from "./ClientRoot";

export const metadata: Metadata = {
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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
