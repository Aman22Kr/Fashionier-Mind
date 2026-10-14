import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, CheckCircle, Calendar, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BespokePage: React.FC = () => {
  const { formatPrice } = useApp();

  // Interactive Bespoke Estimator
  const [silhouette, setSilhouette] = useState<'column' | 'aline' | 'ballgown'>('ballgown');
  const [laceLevel, setLaceLevel] = useState<'minimal' | 'moderate' | 'cathedral'>('cathedral');
  const [trainLength, setTrainLength] = useState<'puddle' | 'chapel' | 'cathedral'>('cathedral');

  const calculateEstimate = () => {
    let basePrice = 4200;
    let hours = 180;
    let weeks = 6;

    if (silhouette === 'aline') {
      basePrice += 600;
      hours += 40;
    } else if (silhouette === 'ballgown') {
      basePrice += 1500;
      hours += 90;
      weeks += 2;
    }

    if (laceLevel === 'moderate') {
      basePrice += 800;
      hours += 60;
      weeks += 1;
    } else if (laceLevel === 'cathedral') {
      basePrice += 1800;
      hours += 140;
      weeks += 2;
    }

    if (trainLength === 'chapel') {
      basePrice += 400;
      hours += 30;
    } else if (trainLength === 'cathedral') {
      basePrice += 900;
      hours += 70;
      weeks += 1;
    }

    return { price: basePrice, hours, weeks };
  };

  const estimate = calculateEstimate();

  return (
    <div className="pb-24">
      {/* Editorial Header */}
      <section className="bg-[#1C1A17] text-[#FAF8F5] py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            Haute Couture Sur Mesure
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight">
            The Bespoke Couture Journey
          </h1>
          <p className="text-base text-[#CCC5B8] font-light max-w-xl mx-auto leading-relaxed">
            A once-in-a-lifetime collaboration between you and our master couturiers. Your pattern cut exclusively for your posture and proportions.
          </p>
        </div>
      </section>

      {/* 4-Step Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-2">
            The Four Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
            From Muslin Toile to Grand Entrance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-6 space-y-3">
            <span className="text-3xl font-serif text-[#8E795D] font-normal block">01</span>
            <h3 className="text-lg font-serif text-[#1A1A1A]">Private Salon Discovery</h3>
            <p className="text-xs text-[#6B655C] leading-relaxed">
              In our Place Vendôme or Madison Ave salon, you meet with our head designer. We review fabric swatches, sketches, neckline geometries, and 30 bodily measurements.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-6 space-y-3">
            <span className="text-3xl font-serif text-[#8E795D] font-normal block">02</span>
            <h3 className="text-lg font-serif text-[#1A1A1A]">The Muslin Toile Fitting</h3>
            <p className="text-xs text-[#6B655C] leading-relaxed">
              We cut a prototype dress in raw cotton muslin. The toile is pinned, marked, and tailored to sculpt your waistline, bust contour, and walking stride.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-6 space-y-3">
            <span className="text-3xl font-serif text-[#8E795D] font-normal block">03</span>
            <h3 className="text-lg font-serif text-[#1A1A1A]">Hand Embroidery & Structure</h3>
            <p className="text-xs text-[#6B655C] leading-relaxed">
              The real Lyon silks and Chantilly laces are cut. Artisans embroider seed pearls and bullion thread onto each individual panel over several hundred hours.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-6 space-y-3">
            <span className="text-3xl font-serif text-[#8E795D] font-normal block">04</span>
            <h3 className="text-lg font-serif text-[#1A1A1A]">Final Fitting & White-Glove Handover</h3>
            <p className="text-xs text-[#6B655C] leading-relaxed">
              Your completed creation is tried on with your ceremony shoes. Hand-delivered in a bespoke monogrammed cotton preservation trunk directly to your suite.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Bespoke Cost & Timeline Estimator */}
      <section className="bg-[#FAF5ED] border-y border-[#E8E0D2] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8E795D] font-semibold block mb-2">
              Interactive Atelier Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
              Estimate Your Bespoke Commission
            </h2>
            <p className="text-xs text-[#6B655C] mt-2">
              Select your preferred silhouette, lace embellishment, and train length to view indicative atelier crafting time and investment.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-8 shadow-md space-y-8">
            {/* Step 1: Silhouette */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#1A1A1A] font-semibold block mb-3">
                1. Architectural Silhouette
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'column', label: 'Column / Mermaid' },
                  { id: 'aline', label: 'Grecian A-Line' },
                  { id: 'ballgown', label: 'Basque Ball Gown' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSilhouette(item.id as any)}
                    className={`py-3 px-3 text-xs tracking-wider border rounded-sm transition-all text-center ${
                      silhouette === item.id
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-semibold'
                        : 'border-[#DDD6CB] bg-white text-[#555] hover:border-[#8E795D]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Lace & Embroidery */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#1A1A1A] font-semibold block mb-3">
                2. Hand Embroidery & Lace Density
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'minimal', label: 'Pure Silk Unadorned' },
                  { id: 'moderate', label: 'Botanical French Lace' },
                  { id: 'cathedral', label: 'Dense Pearl & Bullion' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLaceLevel(item.id as any)}
                    className={`py-3 px-3 text-xs tracking-wider border rounded-sm transition-all text-center ${
                      laceLevel === item.id
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-semibold'
                        : 'border-[#DDD6CB] bg-white text-[#555] hover:border-[#8E795D]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Train Length */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#1A1A1A] font-semibold block mb-3">
                3. Train Sweep Length
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'puddle', label: 'Puddle (0.5m)' },
                  { id: 'chapel', label: 'Chapel (1.5m)' },
                  { id: 'cathedral', label: 'Cathedral (2.5m+)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTrainLength(item.id as any)}
                    className={`py-3 px-3 text-xs tracking-wider border rounded-sm transition-all ${
                      trainLength === item.id
                        ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-semibold'
                        : 'border-[#DDD6CB] bg-white text-[#555] hover:border-[#8E795D]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Result Box */}
            <div className="bg-[#F3EFE9] border border-[#DDD6CB] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C8273] block mb-1">
                  Indicative Investment
                </span>
                <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  ~{formatPrice(estimate.price)}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C8273] block mb-1">
                  Atelier Crafting Hours
                </span>
                <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  ~{estimate.hours} Hours
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C8273] block mb-1">
                  Recommended Lead Time
                </span>
                <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  {estimate.weeks}–{estimate.weeks + 2} Weeks
                </span>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/appointments"
                className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm inline-flex items-center gap-2"
              >
                <span>Reserve Consultation For This Commission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
