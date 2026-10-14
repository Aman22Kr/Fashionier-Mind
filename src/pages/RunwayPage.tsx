import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useApp } from '../context/AppContext';

export const RunwayPage: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<'ss26' | 'fw25'>('ss26');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const { formatPrice, setQuickViewProduct } = useApp();

  const looks = PRODUCTS.map((p, idx) => ({
    lookNumber: `Look ${String(idx + 1).padStart(2, '0')}`,
    product: p,
    model: ['Sasha Pivovarova', 'Adut Akech', 'Mica Argañaraz', 'Anok Yai', 'Vittoria Ceretti', 'Rianne Van Rompaey'][
      idx % 6
    ],
    fabricSummary: p.fabric.split(',')[0],
  }));

  return (
    <div className="pb-24">
      {/* Runway Hero Section */}
      <div className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center bg-[#0F0F0F] text-[#FAF8F5] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="fashionierMind Paris Runway"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-3">
            Paris Haute Couture Week
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal text-[#FAF8F5] tracking-tight mb-4">
            Spring / Summer 2026 Runway
          </h1>
          <p className="text-sm sm:text-base text-[#D4CEC3] max-w-xl mx-auto font-light leading-relaxed mb-8">
            "Nocturne & Pearl" — An architectural homage to Parisian moonlight, sculpted silk faille, and floating cathedral organza.
          </p>

          <button
            onClick={() => setIsPlayingVideo(!isPlayingVideo)}
            className="px-6 py-3 bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isPlayingVideo ? 'Close Runway Video' : 'Watch Runway Presentation (4K)'}</span>
          </button>
        </div>
      </div>

      {/* Runway Video Mock Container */}
      {isPlayingVideo && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 md:-mt-12 relative z-20 mb-16">
          <div className="bg-[#1A1A1A] p-4 sm:p-6 border border-[#333] shadow-2xl rounded-sm">
            <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85"
                alt="Runway film stream"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold mb-2">
                  Live From Grand Palais Éphémère, Paris
                </span>
                <p className="text-2xl font-serif font-normal mb-2">
                  fashionierMind Spring/Summer 2026 Haute Couture
                </p>
                <div className="flex items-center gap-4 text-xs text-[#CCC] mt-2">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Original Score by Maxence Cyrin
                  </span>
                  <span>·</span>
                  <span>Sound Design: 24-Bit Lossless</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Season Selector Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-between border-b border-[#E0D7C9] pb-4 mb-12">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveSeason('ss26')}
              className={`text-xs uppercase tracking-[0.2em] font-semibold pb-4 -mb-4 transition-colors ${
                activeSeason === 'ss26'
                  ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                  : 'text-[#8C8273] hover:text-[#1A1A1A]'
              }`}
            >
              SS26 "Nocturne & Pearl"
            </button>
            <button
              onClick={() => setActiveSeason('fw25')}
              className={`text-xs uppercase tracking-[0.2em] font-semibold pb-4 -mb-4 transition-colors ${
                activeSeason === 'fw25'
                  ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                  : 'text-[#8C8273] hover:text-[#1A1A1A]'
              }`}
            >
              FW25 "Golden Hour Atelier"
            </button>
          </div>

          <span className="text-xs text-[#8C8273] uppercase tracking-widest hidden sm:inline">
            Grand Palais Éphémère · Paris
          </span>
        </div>

        {/* Editorial Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {looks.map((look) => (
            <div
              key={look.lookNumber}
              className="bg-[#FAF8F5] border border-[#DDD6CB] overflow-hidden group flex flex-col"
            >
              <div className="relative aspect-[3/4] bg-[#E8E2D9] overflow-hidden">
                <img
                  src={look.product.images[0]}
                  alt={`${look.lookNumber} - ${look.product.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono font-semibold">
                  {look.lookNumber}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-center text-[11px] text-[#8C8273] uppercase tracking-wider mb-1">
                    <span>Model: {look.model}</span>
                    <span>{look.product.atelierHours}h Handcraft</span>
                  </div>
                  <h3 className="text-xl font-serif text-[#1A1A1A] font-medium">
                    {look.product.name}
                  </h3>
                  <p className="text-xs text-[#6B655C] mt-1">{look.product.subtitle}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                  <span className="text-sm font-mono font-semibold text-[#1A1A1A]">
                    {formatPrice(look.product.price)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuickViewProduct(look.product)}
                      className="text-xs text-[#8E795D] hover:underline uppercase tracking-wider font-semibold"
                    >
                      Quick Inspect
                    </button>
                    <span>·</span>
                    <Link
                      to={`/product/${look.product.id}`}
                      className="text-xs text-[#1A1A1A] hover:underline uppercase tracking-wider font-semibold"
                    >
                      View Gown →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
