import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Calendar,
  Check,
  Ruler,
  Scissors,
  Shield,
  ArrowRight,
  ChevronRight,
  Info,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { CustomMeasurements } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setBookingModalProduct,
    recordView,
  } = useApp();

  const product = PRODUCTS.find((p) => p.id === id || p.slug === id) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'FR 36 (US 4)');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customMeasurements, setCustomMeasurements] = useState<CustomMeasurements>({
    bust: '',
    waist: '',
    hips: '',
    hollowToHem: '',
    height: '',
    notes: '',
  });

  const isFav = isInWishlist(product.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    recordView(product.id);
    setSelectedSize(product.sizes[0] || 'FR 36 (US 4)');
    setIsCustomMode(false);
    setSelectedImage(0);
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(
      product,
      isCustomMode ? 'Custom Made-to-Measure' : selectedSize,
      isCustomMode,
      isCustomMode ? customMeasurements : undefined
    );
  };

  const recommendedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#8C8273] uppercase tracking-wider">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/collections" className="hover:text-[#1A1A1A] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to={`/collections?cat=${product.category}`}
            className="hover:text-[#1A1A1A] transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main PDP Grid (Sticky Gallery Left, Contiguous Purchase Module Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] bg-[#ECE6DC] overflow-hidden rounded-sm border border-[#E0D7C9]">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-semibold text-[#1A1A1A]">
                Paris Atelier Look
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`View angle ${idx + 1}`}
                    className={`aspect-[3/4] overflow-hidden border-2 rounded-sm transition-all bg-[#ECE6DC] ${
                      selectedImage === idx ? 'border-[#1A1A1A] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Editorial Savoir-Faire Callout */}
            <div className="bg-[#FAF5ED] border border-[#DDD6CB] p-6 space-y-3 mt-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8E795D] font-semibold">
                <Scissors className="w-4 h-4" />
                <span>Atelier Savoir-Faire & Fabrication</span>
              </div>
              <p className="text-xs text-[#524E48] leading-relaxed">
                Hand-cut in our Paris atelier. Each seam is bound with silk organza piping and finished with interior grosgrain waist stays. Over <strong>{product.atelierHours} hours</strong> of manual handcraft are invested in this creation.
              </p>
            </div>
          </div>

          {/* Contiguous Purchase Module Column (5 cols, sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8 bg-[#FAF8F5] p-6 sm:p-8 border border-[#E0D7C9] rounded-sm">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#8C8273] font-medium mb-1">
                <span>{product.silhouette}</span>
                <span>Ref: {product.id}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-[#6B655C] mt-1">{product.subtitle}</p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-mono tabular-nums font-semibold text-[#1A1A1A]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-[#8C8273] uppercase tracking-wider">
                  Includes Atelier Alterations & White-Glove Delivery
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Sizing & Custom Fit Module */}
            <div className="space-y-4 pt-4 border-t border-[#E8E2D9]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold">
                  Select Haute Couture Sizing
                </span>
                <button
                  onClick={() => setIsCustomMode(!isCustomMode)}
                  className="text-xs text-[#8E795D] hover:underline uppercase tracking-wider font-medium inline-flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{isCustomMode ? 'Use Standard Size' : 'Request Custom Made-to-Measure'}</span>
                </button>
              </div>

              {isCustomMode ? (
                /* Custom Made-to-Measure Form */
                <div className="bg-[#F5F1EB] p-4 border border-[#DDD6CB] space-y-3">
                  <div className="text-[11px] text-[#6B655C] leading-tight">
                    Enter your personal measurements in cm or inches. Our head draper will draft a personal toile for you.
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6B655C] block mb-0.5">
                        Bust (cm/in)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 88 cm"
                        value={customMeasurements.bust}
                        onChange={(e) =>
                          setCustomMeasurements({ ...customMeasurements, bust: e.target.value })
                        }
                        className="w-full bg-white border border-[#DDD6CB] px-2.5 py-1.5 text-xs text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6B655C] block mb-0.5">
                        Waist (cm/in)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 68 cm"
                        value={customMeasurements.waist}
                        onChange={(e) =>
                          setCustomMeasurements({ ...customMeasurements, waist: e.target.value })
                        }
                        className="w-full bg-white border border-[#DDD6CB] px-2.5 py-1.5 text-xs text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6B655C] block mb-0.5">
                        Hips (cm/in)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 96 cm"
                        value={customMeasurements.hips}
                        onChange={(e) =>
                          setCustomMeasurements({ ...customMeasurements, hips: e.target.value })
                        }
                        className="w-full bg-white border border-[#DDD6CB] px-2.5 py-1.5 text-xs text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6B655C] block mb-0.5">
                        Height & Heel Height
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 175 cm + 8 cm heel"
                        value={customMeasurements.height}
                        onChange={(e) =>
                          setCustomMeasurements({ ...customMeasurements, height: e.target.value })
                        }
                        className="w-full bg-white border border-[#DDD6CB] px-2.5 py-1.5 text-xs text-[#1A1A1A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#6B655C] block mb-0.5">
                      Special requests / event date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding in Amalfi Coast, September 2026"
                      value={customMeasurements.notes}
                      onChange={(e) =>
                        setCustomMeasurements({ ...customMeasurements, notes: e.target.value })
                      }
                      className="w-full bg-white border border-[#DDD6CB] px-2.5 py-1.5 text-xs text-[#1A1A1A]"
                    />
                  </div>
                </div>
              ) : (
                /* Standard sizes grid */
                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        if (size.includes('Custom')) setIsCustomMode(true);
                      }}
                      className={`py-2.5 px-3 text-xs tracking-wider text-left border rounded-sm transition-all ${
                        selectedSize === size
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FAF8F5] font-semibold'
                          : 'border-[#DDD6CB] bg-white text-[#4A4742] hover:border-[#8E795D]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs: Add to Cart, Wishlist, Book Fitting */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D9]">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#8E795D] transition-colors text-xs uppercase tracking-[0.2em] font-semibold rounded-sm text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {isCustomMode
                      ? 'Reserve Custom Made-to-Measure'
                      : `Add ${selectedSize} To Bag`}
                  </span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Save to Wishlist"
                  className={`p-4 border rounded-sm transition-colors ${
                    isFav
                      ? 'border-[#8E795D] bg-[#8E795D] text-white'
                      : 'border-[#DDD6CB] text-[#4A4742] hover:border-[#1A1A1A] bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => setBookingModalProduct(product)}
                className="w-full py-3.5 px-4 border border-[#8E795D] text-[#8E795D] hover:bg-[#8E795D] hover:text-white transition-colors text-xs uppercase tracking-[0.15em] font-medium rounded-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Fitting for This Gown in Salon</span>
              </button>
            </div>

            {/* Highlights & Guarantees */}
            <div className="pt-6 border-t border-[#E8E2D9] space-y-3 text-xs text-[#524E48]">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#8E795D] shrink-0" />
                <span>Complimentary Private Muslin Toile Fitting Included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8E795D] shrink-0" />
                <span>Secured Worldwide White-Glove Hand Courier Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-[#8E795D] shrink-0" />
                <span>Lead time: 6–10 weeks for bespoke atelier crafting</span>
              </div>
            </div>

            {/* Full Spec List */}
            <div className="pt-6 border-t border-[#E8E2D9] space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                Couture Specifications
              </h4>
              <ul className="space-y-1.5 text-xs text-[#5C5750]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#8E795D] font-bold">·</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Pieces */}
        <div className="mt-24 pt-16 border-t border-[#E0D7C9]">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-1">
                Atelier Recommendations
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
                Complete The Haute Couture Ensemble
              </h2>
            </div>
            <Link
              to="/collections"
              className="text-xs uppercase tracking-wider text-[#1A1A1A] hover:underline font-semibold"
            >
              View Full Collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Buy Bar (Only on narrow viewports) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#DDD6CB] px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] z-30 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-mono font-semibold text-[#1A1A1A] tabular-nums block">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] text-[#6B655C] truncate block max-w-[150px]">
            {product.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-semibold rounded-sm shadow-sm"
          >
            Add to Bag
          </button>
          <button
            onClick={() => setBookingModalProduct(product)}
            className="py-2.5 px-3 border border-[#8E795D] text-[#8E795D] text-[11px] uppercase tracking-wider font-semibold rounded-sm"
          >
            Book Fitting
          </button>
        </div>
      </div>
    </div>
  );
};
