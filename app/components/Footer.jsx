import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[var(--color-text)] to-[#1a1212] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-bold text-xl mb-4 text-gradient bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold)]">
              Mahalaxmi Krushi Seva Kendra
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Helping farmers grow better and earn more with quality products
              and expert guidance.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[var(--color-gold-light)]">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/"
                className="text-sm text-gray-300 hover:text-[var(--color-gold-light)] transition-colors hover:translate-x-1 inline-block"
              >
                → Home
              </Link>
              <Link
                href="/#products"
                className="text-sm text-gray-300 hover:text-[var(--color-gold-light)] transition-colors hover:translate-x-1 inline-block"
              >
                → Products
              </Link>
              <Link
                href="/#blogs"
                className="text-sm text-gray-300 hover:text-[var(--color-gold-light)] transition-colors hover:translate-x-1 inline-block"
              >
                → Blogs
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[var(--color-gold-light)]">
              Contact
            </h4>
            <div className="space-y-2.5 text-sm text-gray-300">
              <p className="flex items-center gap-2 hover:text-[var(--color-gold-light)] transition-colors">
                <span className="text-lg">📞</span> +91 758xxxxxx
              </p>
              <p className="flex items-center gap-2 hover:text-[var(--color-gold-light)] transition-colors">
                <span className="text-lg">✉️</span> info@mahalaxmikrushi.com
              </p>
              <p className="flex items-center gap-2 hover:text-[var(--color-gold-light)] transition-colors">
                <span className="text-lg">📍</span> Sangli, Maharashtra
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mahalaxmi Krushi Seva Kendra. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
