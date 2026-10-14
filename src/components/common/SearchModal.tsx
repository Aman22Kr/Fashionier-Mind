import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';
import { Link } from 'react-router-dom';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useApp();
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fashionierMind_search_history');
      return stored ? JSON.parse(stored) : ['Chantilly Lace', 'Velvet Gala', 'Basque Waist', 'Cathedral'];
    } catch {
      return ['Chantilly Lace', 'Velvet Gala'];
    }
  });

  useEffect(() => {
    if (query.trim().length > 2) {
      const timer = setTimeout(() => {
        setHistory((prev) => {
          const updated = [query.trim(), ...prev.filter((q) => q.toLowerCase() !== query.trim().toLowerCase())].slice(0, 5);
          localStorage.setItem('fashionierMind_search_history', JSON.stringify(updated));
          return updated;
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.silhouette.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 pt-6 sm:pt-16 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-2xl w-full max-h-[90vh] flex flex-col border border-[#DFD7CB] shadow-2xl relative animate-in fade-in duration-200 overflow-hidden my-auto sm:my-0">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8E2D9] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C8273]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by gown name, silhouette, lace, or silk fabric..."
            className="flex-1 bg-transparent text-base sm:text-lg font-serif text-[#1A1A1A] placeholder:text-[#A39988] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#8C8273] hover:text-[#1A1A1A]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="text-xs uppercase tracking-wider text-[#6B655C] hover:text-[#1A1A1A] px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-6 py-3 bg-[#F5F1EB] border-b border-[#E8E2D9] flex items-center gap-2 overflow-x-auto text-[11px] tracking-wider text-[#6B655C]">
          <span className="uppercase text-[#8C8273] font-semibold shrink-0">Popular:</span>
          {history.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white border border-[#DDD6CB] rounded-sm transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#EFE9DF]">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-[#8C8273]">
              <p className="font-serif text-lg text-[#1A1A1A] mb-1">No couture pieces found</p>
              <p className="text-xs">Try searching for "bridal", "velvet", "organza", or "Mikado".</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                onClick={() => setIsSearchOpen(false)}
                className="py-3 flex items-center justify-between gap-4 hover:bg-[#F2ECE3] px-2 -mx-2 transition-colors rounded-sm group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-cover bg-[#E8E2D9] rounded-sm"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8E795D] font-medium block">
                      {p.silhouette} · {p.atelierHours}h
                    </span>
                    <h4 className="text-base font-serif text-[#1A1A1A] group-hover:text-[#8E795D] transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-xs text-[#6B655C]">{p.subtitle}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-[#1A1A1A] tabular-nums">
                    {formatPrice(p.price)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8C8273] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#EFE9DF] text-center text-[11px] text-[#6B655C] flex items-center justify-between px-6">
          <span>Explore all collections</span>
          <Link
            to="/collections"
            onClick={() => setIsSearchOpen(false)}
            className="text-[#1A1A1A] uppercase tracking-wider font-semibold hover:underline"
          >
            View Full Catalog ({PRODUCTS.length} Gowns) →
          </Link>
        </div>
      </div>
    </div>
  );
};
