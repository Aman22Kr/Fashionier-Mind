import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Ruler, Package, Sparkles, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'Sizing & Made-to-Measure',
      q: 'How does fashionierMind haute couture sizing compare to ready-to-wear?',
      a: 'Our collection sizes adhere to traditional French haute couture specifications (FR 34–44), which are tailored with higher precision around the waist and ribcage than commercial ready-to-wear. For all bridal commissions and gala pieces, we strongly recommend our Made-to-Measure service, which includes an unbleached cotton muslin toile drafted directly to your exact bodily measurements.',
    },
    {
      category: 'Sizing & Made-to-Measure',
      q: 'What measurements are required for custom made-to-measure orders?',
      a: 'We require four primary measurements: high bust, natural waist (the narrowest point above your navel), full hip contour (around the widest curve of the seat), and hollow-to-hem (measured with your wedding or event heels on). You can enter these during checkout or book an appointment for our salon directrice to measure you.',
    },
    {
      category: 'Production & Timelines',
      q: 'What is the production timeline for a bespoke gown?',
      a: 'Because our creations require between 150 to over 420 hours of manual embroidery and draping, our standard lead time is 8 to 12 weeks. We recommend commissioning your bridal gown 6 to 9 months prior to your celebration. Rush atelier commissions (under 6 weeks) are accommodated based on current salon capacity.',
    },
    {
      category: 'Fittings & Salons',
      q: 'Do I have to travel to Paris for my fittings?',
      a: 'While our primary atelier is situated at 18 Place Vendôme in Paris, we host permanent private fitting suites at our Madison Avenue salon in New York and Mayfair townhouse in London. For destination celebrations, our "Flying Master Couturier" service dispatches a head artisan directly to your hotel or private residence anywhere worldwide.',
    },
    {
      category: 'Delivery & Care',
      q: 'How are fashionierMind creations packaged and shipped internationally?',
      a: 'Every completed creation is hand-steamed, wrapped in pure acid-free tissue paper, and encased inside an archival monogrammed cotton presentation trunk. We use dedicated white-glove couriers with climate-controlled handling and door-to-door concierge delivery.',
    },
    {
      category: 'Delivery & Care',
      q: 'How should I clean and preserve my gown after the event?',
      a: 'Haute couture garments containing natural Mulberry silk, Lyon velvet, or seed pearls must never be processed through standard dry cleaning. We provide an Heirloom Preservation Concierge service: return your gown to any of our salons post-event for ultrasonic lace restoration, pearl stabilization, and acid-free archival boxing designed to preserve fabric integrity for generations.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8E795D] font-semibold block">
          Patron Guide & Information
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] font-normal">
          Couture FAQ & Sizing Guide
        </h1>
        <p className="text-sm text-[#6B655C] leading-relaxed font-light">
          Everything you need to know about our bespoke atelier process, salon fittings, global deliveries, and heirloom preservation.
        </p>
      </div>

      {/* Sizing Reference Table */}
      <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-6 sm:p-8 mb-16 space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8E795D] font-semibold">
          <Ruler className="w-4 h-4" />
          <span>Haute Couture Measurement Scale (French Standard)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DDD6CB] text-[#1A1A1A] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">French Size</th>
                <th className="py-2.5 px-3">US Equivalent</th>
                <th className="py-2.5 px-3">Bust (cm / in)</th>
                <th className="py-2.5 px-3">Waist (cm / in)</th>
                <th className="py-2.5 px-3">Hips (cm / in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9] text-[#524E48] font-mono tabular-nums">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1A1A]">FR 34</td>
                <td className="py-2.5 px-3">US 0–2</td>
                <td className="py-2.5 px-3">82 cm / 32.3"</td>
                <td className="py-2.5 px-3">62 cm / 24.4"</td>
                <td className="py-2.5 px-3">88 cm / 34.6"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1A1A]">FR 36</td>
                <td className="py-2.5 px-3">US 4</td>
                <td className="py-2.5 px-3">86 cm / 33.8"</td>
                <td className="py-2.5 px-3">66 cm / 26.0"</td>
                <td className="py-2.5 px-3">92 cm / 36.2"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1A1A]">FR 38</td>
                <td className="py-2.5 px-3">US 6</td>
                <td className="py-2.5 px-3">90 cm / 35.4"</td>
                <td className="py-2.5 px-3">70 cm / 27.5"</td>
                <td className="py-2.5 px-3">96 cm / 37.8"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1A1A]">FR 40</td>
                <td className="py-2.5 px-3">US 8</td>
                <td className="py-2.5 px-3">94 cm / 37.0"</td>
                <td className="py-2.5 px-3">74 cm / 29.1"</td>
                <td className="py-2.5 px-3">100 cm / 39.4"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[#1A1A1A]">FR 42</td>
                <td className="py-2.5 px-3">US 10</td>
                <td className="py-2.5 px-3">98 cm / 38.6"</td>
                <td className="py-2.5 px-3">78 cm / 30.7"</td>
                <td className="py-2.5 px-3">104 cm / 40.9"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-[#7A7468]">
          * All creations can be cut to custom bespoke measurements without surcharge.
        </p>
      </div>

      {/* Accordion FAQs */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#FAF8F5] border border-[#DDD6CB] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#F7F2EA] transition-colors"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8E795D] font-bold block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif text-[#1A1A1A] font-medium">
                    {faq.q}
                  </h3>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#8E795D] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8C8273] shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-5 sm:p-6 pt-0 border-t border-[#EAE4D9] text-xs sm:text-sm text-[#524E48] leading-relaxed font-light">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Inquiry CTA */}
      <div className="mt-16 bg-[#1A1A1A] text-white p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl font-serif font-normal">Have Further Bespoke Questions?</h3>
        <p className="text-xs text-[#CCC] max-w-md mx-auto">
          Our senior concierge in Paris is delighted to answer any specific questions regarding custom fabrications, veil pairings, or event deadlines.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-[#C5A880] text-[#1A1A1A] hover:bg-[#FAF8F5] transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm inline-block"
          >
            Contact Salon Directrice
          </Link>
        </div>
      </div>
    </div>
  );
};
