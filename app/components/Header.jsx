"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_CONFIG } from "../../config/constants";

export default function Header({ currentLang, setCurrentLang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 sticky top-0 z-30 shadow-soft backdrop-blur-md border-b border-[var(--color-cream)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--color-gold)]/20 group-hover:ring-[var(--color-gold)]/50 transition-all">
              <Image src="/ml.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-gradient text-base md:text-lg hidden sm:block">
              Mahalaxmi Krushi Seva
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-[var(--color-text)] hover:text-[var(--color-gold)] font-medium transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all" />
            </Link>
            <Link
              href="/#products"
              className="text-[var(--color-text)] hover:text-[var(--color-gold)] font-medium transition-colors relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all" />
            </Link>
            <Link
              href="/#blogs"
              className="text-[var(--color-text)] hover:text-[var(--color-gold)] font-medium transition-colors relative group"
            >
              Blogs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all" />
            </Link>
            <Link
              href="/cart"
              className="text-[var(--color-text)] hover:text-[var(--color-gold)] font-medium transition-colors relative group"
            >
              Cart
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all" />
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-[var(--color-cream)] rounded-lg p-1">
            {APP_CONFIG.languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${
                  currentLang === lang.code
                    ? "gradient-gold text-white shadow-sm"
                    : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white"
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[var(--color-gold)] p-2 hover:bg-[var(--color-cream)] rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            <Link
              href="/"
              className="text-[var(--color-text)] py-3 px-4 hover:bg-[var(--color-cream)] rounded-lg transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/#products"
              className="text-[var(--color-text)] py-3 px-4 hover:bg-[var(--color-cream)] rounded-lg transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              href="/#blogs"
              className="text-[var(--color-text)] py-3 px-4 hover:bg-[var(--color-cream)] rounded-lg transition-colors font-medium"
            >
              Blogs
            </Link>
            <Link
              href="/cart"
              className="text-[var(--color-text)] py-3 px-4 hover:bg-[var(--color-cream)] rounded-lg transition-colors font-medium"
            >
              Cart
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
