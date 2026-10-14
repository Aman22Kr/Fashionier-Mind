import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, formatPrice, setQuickViewProduct, addToCart } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const isFav = isInWishlist(product.id);

  const [imgError, setImgError] = useState(false);
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-[#FAF8F5] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE6DC] rounded-sm">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {imgError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#ECE6DC] to-[#DDD4C5]">
              <span className="font-serif text-2xl text-[#1A1A1A] italic">FM</span>
              <span className="text-[11px] uppercase tracking-widest text-[#8E795D] mt-2 font-medium">
                {product.name}
              </span>
              <span className="text-[9px] text-[#7A7468] uppercase tracking-wider mt-1">
                {product.silhouette}
              </span>
            </div>
          ) : (
            <img
              src={displayImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
        </Link>

        {/* Quick actions overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-2 rounded-full transition-all duration-200 shadow-sm ${
              isFav
                ? 'bg-[#8E795D] text-white'
                : 'bg-white/80 hover:bg-white text-[#4A4742] hover:text-[#1A1A1A] backdrop-blur-sm'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label="Quick inspect creation"
            className="p-2 rounded-full bg-white/80 hover:bg-white text-[#4A4742] hover:text-[#1A1A1A] backdrop-blur-sm transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom hover quick-add bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-2">
          <button
            onClick={() => addToCart(product, product.sizes[0], false)}
            className="w-full py-2 px-3 bg-[#FAF8F5] text-[#1A1A1A] hover:bg-white text-[11px] tracking-widest uppercase font-semibold text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Quick Bag ({product.sizes[0]})</span>
          </button>
        </div>
      </div>

      {/* Product Details (Zero-Pill Discipline) */}
      <div className="pt-4 pb-2 flex flex-col flex-1">
        {/* Unboxed metadata with typographic separators */}
        <div className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#8C8273] mb-1 font-medium">
          <span>{product.silhouette}</span>
          <span aria-hidden="true">·</span>
          <span>{product.atelierHours}h Handcraft</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif text-[#1A1A1A] font-medium leading-snug group-hover:text-[#8E795D] transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[#6B655C] line-clamp-1 mt-0.5 mb-2 font-normal">
          {product.subtitle}
        </p>

        {/* Price in Tabular figures */}
        <div className="mt-auto flex items-center justify-between pt-1 border-t border-[#ECE6DC]">
          <span className="text-sm font-semibold tracking-wider font-mono tabular-nums text-[#1A1A1A]">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] tracking-widest uppercase text-[#A39988]">
            {product.category === 'bridal' ? 'Bridal Couture' : 'Atelier Edition'}
          </span>
        </div>
      </div>
    </div>
  );
};
