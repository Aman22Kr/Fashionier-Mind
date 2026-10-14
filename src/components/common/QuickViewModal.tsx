import React, { useState } from 'react';
import { X, Check, Heart, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setBookingModalProduct,
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFav = isInWishlist(product.id);
  const currentSize = selectedSize || product.sizes[0];

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentSize.includes('Custom'));
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#DFD7CB] shadow-2xl relative my-auto animate-in fade-in duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close preview"
          className="absolute top-4 right-4 z-10 p-2 text-[#7A766E] hover:text-[#1A1A1A] bg-white/80 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-[#E8E2D9] overflow-hidden">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-16 border-2 overflow-hidden bg-white ${
                      activeImageIndex === idx ? 'border-[#1A1A1A]' : 'border-white/60 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C8273] font-medium mb-1">
                <span>{product.silhouette}</span>
                <span>·</span>
                <span>{product.season}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] font-normal mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#6B655C] mb-4">{product.subtitle}</p>

              <div className="text-xl font-mono tabular-nums font-semibold text-[#1A1A1A] mb-4">
                {formatPrice(product.price)}
              </div>

              <p className="text-xs text-[#524E48] leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs tracking-wider uppercase text-[#6B655C] mb-2 font-medium">
                  <span>Atelier Sizing</span>
                  <Link
                    to="/faq"
                    onClick={() => setQuickViewProduct(null)}
                    className="text-[#8E795D] underline"
                  >
                    Measurement Guide
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-3 text-xs tracking-wider text-left border rounded-sm transition-all ${
                        currentSize === s
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FAF8F5] font-semibold'
                          : 'border-[#DDD6CB] bg-white text-[#4A4742] hover:border-[#8E795D]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Atelier Specs */}
              <div className="bg-[#F3EFE9] p-3 text-[11px] text-[#5C5750] space-y-1 mb-6 border border-[#E5DDD0]">
                <div>
                  <strong className="text-[#1A1A1A]">Artisanal Handcraft:</strong>{' '}
                  {product.atelierHours} hours embroidery & tailoring
                </div>
                <div>
                  <strong className="text-[#1A1A1A]">Fabrication:</strong> {product.fabric}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D9]">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#1A1A1A] text-[#FAF8F5] text-xs tracking-widest uppercase font-semibold hover:bg-[#8E795D] transition-colors rounded-sm text-center"
                >
                  Add To Shopping Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist toggle"
                  className={`p-3 border rounded-sm transition-colors ${
                    isFav
                      ? 'border-[#8E795D] bg-[#8E795D] text-white'
                      : 'border-[#DDD6CB] text-[#4A4742] hover:border-[#1A1A1A]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setBookingModalProduct(product);
                    setQuickViewProduct(null);
                  }}
                  className="w-full py-2.5 px-3 border border-[#8E795D] text-[#8E795D] hover:bg-[#8E795D] hover:text-white text-xs tracking-wider uppercase font-medium transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Private Fitting in Salon</span>
                </button>
              </div>

              <div className="text-center">
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-xs text-[#8E795D] hover:underline uppercase tracking-wider"
                >
                  View Full Couture Specifications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
