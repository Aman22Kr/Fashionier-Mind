import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Compass, Shield, Award, Sparkles, ArrowRight } from 'lucide-react';
import { SALONS } from '../data/products';

export const AtelierPage: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Editorial Header */}
      <section className="bg-[#181818] text-[#FAF8F5] py-20 lg:py-28 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            Maison Heritage & Craftsmanship
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight">
            The fashionierMind Atelier
          </h1>
          <p className="text-base sm:text-lg text-[#C5BFAF] font-light max-w-2xl mx-auto leading-relaxed">
            Where classical French savoir-faire meets avant-garde architectural proportion. Crafted exclusively by hand in our private Paris and New York salons.
          </p>
        </div>
      </section>

      {/* Philosophy Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block">
              The Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal leading-tight">
              An Architecture of Elegance
            </h2>
            <p className="text-sm sm:text-base text-[#524E48] leading-relaxed font-light">
              fashionierMind was conceived with a radical conviction: haute couture must transcend passive decoration. A gown is a living structural environment—one that must move with fluid majesty while maintaining sovereign architectural posture.
            </p>
            <p className="text-sm text-[#524E48] leading-relaxed font-light">
              Unlike industrial bridal manufacturing, every fashionierMind creation begins not with automated laser cutters, but with hand-drawn charcoal sketches and unbleached cotton muslin draped directly onto wooden Stockman mannequins.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#E8E2D9]">
              <div>
                <span className="text-2xl font-serif text-[#1A1A1A] block font-semibold">100%</span>
                <span className="text-xs text-[#8C8273] uppercase tracking-wider">Natural Heritage Silks</span>
              </div>
              <div>
                <span className="text-2xl font-serif text-[#1A1A1A] block font-semibold">300+</span>
                <span className="text-xs text-[#8C8273] uppercase tracking-wider">Hours Per Creation</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-[#E8E2D9] overflow-hidden rounded-sm border border-[#DDD6CB]">
            <img
              src="https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85"
              alt="Atelier draping in Paris"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* The 3 Savoir-Faire Pillars */}
      <section className="bg-[#FAF5ED] border-y border-[#E8E0D2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-2">
              Artisanal Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
              Three Tenets of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-8 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center font-serif text-lg">
                01
              </div>
              <h3 className="text-xl font-serif text-[#1A1A1A]">Le Moulage (Draping)</h3>
              <p className="text-xs text-[#6B655C] leading-relaxed">
                We manipulate fabric directly in three dimensions. Folds, flares, and pleats are shaped on the mannequin until the tension, fall, and silhouette achieve balance.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-8 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center font-serif text-lg">
                02
              </div>
              <h3 className="text-xl font-serif text-[#1A1A1A]">La Broderie (Embroidery)</h3>
              <p className="text-xs text-[#6B655C] leading-relaxed">
                Using traditional Lunéville hooks and tambour embroidery frames, our embroiderers attach seed pearls, bullion wire, and crystals petal by petal.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-8 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C5A880] flex items-center justify-center font-serif text-lg">
                03
              </div>
              <h3 className="text-xl font-serif text-[#1A1A1A]">L’Architecture (Corsetry)</h3>
              <p className="text-xs text-[#6B655C] leading-relaxed">
                Invisible internal corsetry built from feather-light spiral steel stays wrapped in plush velvet. Gives statuesque posture without restricting movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Salons List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-2">
            Private Locations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
            Our Flagship Salons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SALONS.map((salon) => (
            <div
              key={salon.city}
              className="bg-[#FAF8F5] border border-[#DDD6CB] p-8 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8E795D] font-semibold block mb-1">
                  {salon.city} Flagship
                </span>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">{salon.name}</h3>
                <p className="text-xs text-[#524E48] mb-4 leading-relaxed">{salon.address}</p>
                <div className="text-xs text-[#7A766E] space-y-1 mb-6">
                  <p>{salon.hours}</p>
                  <p className="font-mono text-[#1A1A1A] font-medium">{salon.phone}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9]">
                <Link
                  to="/appointments"
                  className="w-full py-2.5 px-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8E795D] transition-colors rounded-sm text-center block"
                >
                  Book Private Fitting
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
