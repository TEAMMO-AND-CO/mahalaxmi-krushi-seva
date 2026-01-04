import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, lang = "en" }) {
  const getName = () => {
    if (lang === "hi") return product.nameHi || product.name;
    if (lang === "mr") return product.nameMr || product.name;
    return product.name;
  };

  const getDescription = () => {
    if (lang === "hi") return product.descriptionHi || product.description;
    if (lang === "mr") return product.descriptionMr || product.description;
    return product.description;
  };

  return (
    <div className="card group overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 w-full overflow-hidden rounded-t-[var(--radius)]">
          <Image
            src={product.image}
            alt={getName()}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-[var(--color-text)] mb-2 hover:text-[var(--color-green-dark)] transition-colors">
            {getName()}
          </h3>
        </Link>

        <p className="text-sm text-[var(--color-muted)] mb-4 line-clamp-2 leading-relaxed">
          {getDescription()}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-cream)]">
          <span className="text-lg font-bold text-gradient">
            ₹{product.price}
          </span>
          <Link
            href={`/product/${product.id}`}
            className="btn-primary text-sm px-4 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
