import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, formatPrice, showToast } = useApp();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Wishlist link copied to clipboard.');
    } else {
      showToast('Wishlist URL ready to share.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E0D7C9] pb-6 mb-12 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8E795D] font-semibold block mb-1">
            Curated Archive
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
            Your Saved Creations
          </h1>
        </div>

        {savedProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 border border-[#DDD6CB] text-[#4A4742] hover:text-[#1A1A1A] hover:border-[#1A1A1A] text-xs uppercase tracking-wider font-medium transition-colors rounded-sm inline-flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Archive</span>
            </button>
            <span className="text-xs text-[#8C8273] uppercase tracking-wider">
              {savedProducts.length} Items Saved
            </span>
          </div>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-16 text-center space-y-4 max-w-xl mx-auto my-12">
          <Heart className="w-10 h-10 text-[#C5A880] mx-auto opacity-70" />
          <h3 className="text-2xl font-serif text-[#1A1A1A]">Your Wishlist Is Empty</h3>
          <p className="text-xs text-[#6B655C] leading-relaxed">
            As you browse our haute couture bridal and evening collections, click the heart icon on any creation to save it to your private portfolio.
          </p>
          <div className="pt-2">
            <Link
              to="/collections"
              className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm inline-flex items-center gap-2"
            >
              <span>Explore The Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {savedProducts.map((product) => (
            <div key={product.id} className="relative group flex flex-col">
              <ProductCard product={product} />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => addToCart(product, product.sizes[0], false)}
                  className="flex-1 py-2 px-3 bg-[#1A1A1A] text-white hover:bg-[#8E795D] text-[11px] uppercase tracking-wider font-semibold transition-colors rounded-sm flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move To Bag ({product.sizes[0]})</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  title="Remove from saved"
                  className="p-2 border border-[#DDD6CB] text-[#999] hover:text-[#B00020] hover:border-[#B00020] transition-colors rounded-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
