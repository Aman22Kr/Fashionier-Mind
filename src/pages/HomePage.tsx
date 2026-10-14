import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Scissors, Clock, ShieldCheck, Compass } from 'lucide-react';
import { PRODUCTS, REVIEWS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { setBookingModalProduct } = useApp();
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const heroProduct = PRODUCTS[0];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* 1. Haute Couture Campaign Hero */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[#141414] text-[#FAF8F5] overflow-hidden">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=2000&q=85"
            alt="fashionierMind Haute Couture Editorial"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-60 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              <span>Haute Couture Paris & New York</span>
              <span aria-hidden="true">·</span>
              <span>Spring / Summer 2026</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal leading-[1.08] tracking-tight text-[#FAF8F5] [text-wrap:balance]">
              Sculptural Bridal Architecture & Gala Gowns
            </h1>

            <p className="text-base sm:text-lg text-[#C8C2B8] leading-relaxed font-light [text-wrap:balance]">
              Each fashionierMind creation is hand-cut and draped on the mannequin in our Paris Place Vendôme atelier. Bespoke made-to-measure commissions for extraordinary weddings and global red carpets.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/collections"
                className="px-8 py-4 bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-all text-xs uppercase tracking-[0.2em] font-semibold rounded-sm inline-flex items-center gap-2"
              >
                <span>Explore Creations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setBookingModalProduct(heroProduct)}
                className="px-8 py-4 border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-all text-xs uppercase tracking-[0.2em] font-semibold rounded-sm"
              >
                Book Private Salon Fitting
              </button>
            </div>
          </div>
        </div>

        {/* Floating Season Pill (Editorial Indicator) */}
        <div className="absolute bottom-6 right-8 hidden sm:flex items-center gap-3 text-xs tracking-widest uppercase text-[#9E9A91] border-l border-[#444] pl-4">
          <span>Look 01: L’Aura Céleste</span>
          <span>·</span>
          <span>420 Hours Hand Embroidery</span>
        </div>
      </section>

      {/* 2. Brand Pillars & Savoir-Faire Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:-mt-12 relative z-20">
        <div className="bg-[#FAF8F5] border border-[#DDD6CB] shadow-xl p-8 grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E8E2D9]">
          <div className="flex items-start gap-4 pt-4 md:pt-0">
            <Scissors className="w-5 h-5 text-[#8E795D] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-1">
                Bespoke Made-to-Measure
              </h4>
              <p className="text-xs text-[#6B655C] leading-relaxed">
                Individual pattern drafted specifically to your exact contours through bespoke muslin toiles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
            <Clock className="w-5 h-5 text-[#8E795D] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-1">
                200–500 Hours Handcraft
              </h4>
              <p className="text-xs text-[#6B655C] leading-relaxed">
                French Chantilly lace appliques, seed pearls, and structured internal corsetry.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
            <Compass className="w-5 h-5 text-[#8E795D] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-1">
                Global Salon Network
              </h4>
              <p className="text-xs text-[#6B655C] leading-relaxed">
                Private fittings at Place Vendôme Paris, Madison Ave New York, and Mayfair London.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
            <ShieldCheck className="w-5 h-5 text-[#8E795D] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A] mb-1">
                White-Glove Courier
              </h4>
              <p className="text-xs text-[#6B655C] leading-relaxed">
                Acid-free heirloom preservation trunk with dedicated personal delivery to your venue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#E8E2D9] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-1">
              Curated Masterpieces
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
              Signature Haute Couture Gowns
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#8E795D] font-semibold inline-flex items-center gap-2 group"
          >
            <span>View All Creations ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Atelier Craftsmanship Story (Split-Screen Editorial) */}
      <section className="bg-[#1A1A1A] text-[#FAF8F5] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#262626] rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85"
                alt="fashionierMind Master Couturière at work"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-md p-4 border border-white/10 text-xs text-[#E0DDD7]">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold mb-1">
                  Atelier Savoir-Faire
                </span>
                <p>
                  Hand-draping of French Chantilly lace on wooden Stockman mannequin in Paris.
                </p>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                The fashionierMind Philosophy
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal leading-tight text-[#FAF8F5] [text-wrap:balance]">
                Where Architectural Precision Meets Poetic Drapery
              </h2>
              <p className="text-sm sm:text-base text-[#C2BCB2] leading-relaxed font-light">
                Founded on the belief that a wedding gown or gala creation should possess the structural integrity of architecture and the fluid grace of music. In our salons, master artisans with decades of experience at historic Parisian ateliers execute every stitch by hand.
              </p>
              <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#A8A296] font-light">
                <div className="flex items-start gap-3">
                  <span className="text-[#C5A880] font-serif text-lg">01.</span>
                  <p>
                    <strong className="text-[#FAF8F5] font-normal">Mulberry Silks & Lyon Velvets:</strong> Sourced exclusively from heritage mills in Como, Italy and Lyon, France with zero synthetic fillers.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#C5A880] font-serif text-lg">02.</span>
                  <p>
                    <strong className="text-[#FAF8F5] font-normal">Internal Corsetry Architecture:</strong> Flex-steel stays hand-cased in plush cotton velvet for posture and comfort throughout twelve-hour galas.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#C5A880] font-serif text-lg">03.</span>
                  <p>
                    <strong className="text-[#FAF8F5] font-normal">Single-Patron Dedication:</strong> A lead couturière oversees your gown from the primary muslin fitting to final venue delivery.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/atelier"
                  className="px-8 py-3.5 border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors text-xs uppercase tracking-[0.2em] font-semibold inline-block rounded-sm"
                >
                  Discover The Atelier Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Collections By Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-2">
            Haute Couture Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
            Designed for Transcendent Moments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bridal */}
          <Link
            to="/collections?cat=bridal"
            className="group relative aspect-[3/4] overflow-hidden bg-[#E8E2D9] rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1000&q=85"
              alt="Bridal Couture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                Cathedral & Ballroom
              </span>
              <h3 className="text-2xl font-serif font-normal">Haute Couture Bridal</h3>
              <p className="text-xs text-[#D1CCC2] mt-1 opacity-90">
                Architectural Basque waists, Chantilly lace, and 3-meter trains.
              </p>
            </div>
          </Link>

          {/* Evening */}
          <Link
            to="/collections?cat=evening"
            className="group relative aspect-[3/4] overflow-hidden bg-[#E8E2D9] rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85"
              alt="Evening & Gala"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                Red Carpet & Gala
              </span>
              <h3 className="text-2xl font-serif font-normal">Gala & Eveningwear</h3>
              <p className="text-xs text-[#D1CCC2] mt-1 opacity-90">
                Midnight velvet columns, liquid lamé, and sculpted portrait necklines.
              </p>
            </div>
          </Link>

          {/* Resort & Accessories */}
          <Link
            to="/collections?cat=resort"
            className="group relative aspect-[3/4] overflow-hidden bg-[#E8E2D9] rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85"
              alt="Riviera Resort"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                Riviera & Soirée
              </span>
              <h3 className="text-2xl font-serif font-normal">Resort & Plissé</h3>
              <p className="text-xs text-[#D1CCC2] mt-1 opacity-90">
                Sunburst pleated butterfly kaftans and feather cocktail columns.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 6. Client Testimonials (Claim-to-Proof Adjacency) */}
      <section className="bg-[#FAF5ED] border-y border-[#E8E0D2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-2">
              Patron Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
              Words From Our Salon Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FAF8F5] border border-[#DDD6CB] p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#8E795D] font-semibold mb-3">
                    Commission: {rev.gown}
                  </div>
                  <p className="text-sm text-[#4A4742] leading-relaxed font-light italic mb-6">
                    "{rev.content}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E8E2D9]">
                  <strong className="text-sm font-serif text-[#1A1A1A] block">
                    {rev.author}
                  </strong>
                  <span className="text-xs text-[#8C8273] block">{rev.role}</span>
                  <span className="text-[11px] text-[#A39988] block mt-1">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Private Salon Fitting Invitation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A] text-[#FAF8F5] p-10 sm:p-16 border border-[#2E2E2E] flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block">
              Private Salon Discovery
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal">
              Begin Your Bespoke Couture Journey
            </h2>
            <p className="text-sm text-[#B8B2A6] font-light leading-relaxed">
              Schedule a private appointment with our master couturiers in Paris, New York, London, or via high-definition video concierge.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              to="/appointments"
              className="px-8 py-3.5 bg-[#C5A880] text-[#1A1A1A] hover:bg-[#FAF8F5] transition-colors text-xs uppercase tracking-[0.2em] font-semibold rounded-sm"
            >
              Book Salon Appointment
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-[#888] text-[#FAF8F5] hover:border-[#FAF8F5] transition-colors text-xs uppercase tracking-[0.2em] font-medium rounded-sm"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
