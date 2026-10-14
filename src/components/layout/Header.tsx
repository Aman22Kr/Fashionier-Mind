import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Currency } from '../../types';

export const Header: React.FC = () => {
  const { cartCount, wishlist, currency, setCurrency, setIsSearchOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Collections', path: '/collections' },
    { label: 'Runway', path: '/runway' },
    { label: 'The Atelier', path: '/atelier' },
    { label: 'Bespoke Services', path: '/bespoke' },
    { label: 'Book Appointment', path: '/appointments' },
  ];

  const isActive = (path: string) => {
    if (path === '/collections') return location.pathname.startsWith('/collections');
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-[#181818] text-[#E8E2D9] text-[11px] tracking-widest py-1.5 px-4 text-center uppercase font-medium">
        Paris Haute Couture Week · Complimenary Global White-Glove Atelier Delivery & Bespoke Fittings
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single Element) */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-normal text-[#1A1A1A] hover:text-[#8E795D] transition-colors whitespace-nowrap shrink-0"
          >
            fashionierMind
          </Link>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.15em] uppercase font-medium text-[#4A4742]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#1A1A1A] ${
                  isActive(link.path)
                    ? 'text-[#1A1A1A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#1A1A1A]'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Actions & Affordances */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Currency selector */}
            <div className="hidden sm:flex items-center text-xs tracking-wider text-[#6B655C] border border-[#DDD6CB] rounded px-2 py-1 bg-[#F5F2EB]/60">
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    currency === cur ? 'bg-[#1A1A1A] text-white' : 'hover:text-[#1A1A1A]'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search creations"
              className="p-2 text-[#4A4742] hover:text-[#1A1A1A] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-[#4A4742] hover:text-[#1A1A1A] transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8E795D] text-white text-[9px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>


            {/* Shopping Bag */}
            <Link
              to="/bag"
              aria-label="Shopping Bag"
              className="relative p-2 text-[#4A4742] hover:text-[#1A1A1A] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1A1A1A] text-white text-[9px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
              className="lg:hidden p-2 text-[#4A4742] hover:text-[#1A1A1A]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-6 transition-all max-h-[calc(100vh-5.5rem)] overflow-y-auto shadow-xl">
          <nav className="flex flex-col gap-4 text-sm tracking-widest uppercase font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 border-b border-[#F0EAE1] ${
                  isActive(link.path) ? 'text-[#1A1A1A] font-bold' : 'text-[#6B655C]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/collections"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#6B655C] border-b border-[#F0EAE1]"
            >
              All Haute Couture Gowns
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#6B655C] border-b border-[#F0EAE1]"
            >
              Flagship Salons (Paris · NY · London)
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#6B655C]"
            >
              Couture Care & Sizing Guide
            </Link>

            <div className="pt-4 flex items-center justify-between border-t border-[#E8E2D9]">
              <span className="text-xs uppercase tracking-wider text-[#8E8271]">Currency</span>
              <div className="flex gap-2">
                {(['USD', 'EUR', 'GBP'] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-2 py-1 text-xs rounded ${
                      currency === cur ? 'bg-[#1A1A1A] text-white font-medium' : 'bg-[#EAE4D9]'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
