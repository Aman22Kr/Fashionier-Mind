import React, { useState } from 'react';
import { ExternalLink, X, Sparkles, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdSection: React.FC = () => {
  const { isAdDismissed, setIsAdDismissed } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isAdDismissed) {
    return (
      <div className="bg-[#F0EAE1]/80 border-t border-[#E0D7C9] py-2 px-4 text-center">
        <button
          onClick={() => setIsAdDismissed(false)}
          className="text-[11px] tracking-widest uppercase text-[#8C8273] hover:text-[#1A1A1A] inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ChevronUp className="w-3 h-3" />
          <span>Show Curated Haute Couture Partner Feature</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#F3EFE9] border-t border-[#DFD7CB] py-4 px-4 sm:px-6 relative transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-7 h-7 rounded-full bg-[#1A1A1A] text-[#FAF8F5] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C7A62] bg-[#E5DCD0] px-1.5 py-0.5 rounded-sm">
                  Curated Partner Feature
                </span>
                <span className="text-xs font-serif italic text-[#4A4742]">
                  Vogue Runway & Haute Joaillerie
                </span>
              </div>
              <p className="text-xs text-[#524E48] mt-0.5">
                Exclusive trunk shows: Pair your fashionierMind bespoke gowns with Paris Place Vendôme high-jewelry collections.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#8E795D] transition-colors rounded-sm inline-flex items-center gap-1.5"
            >
              <span>Explore Trunk Shows</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsAdDismissed(true)}
              aria-label="Dismiss partner announcement"
              className="p-1.5 text-[#8C8273] hover:text-[#1A1A1A] hover:bg-[#E2D8CA] rounded transition-colors"
              title="Minimize advertisement banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Partner Trunk Show Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#FAF8F5] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#DFD7CB] shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#7A766E] hover:text-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] uppercase tracking-widest text-[#8E795D] font-bold block mb-2">
              Official Haute Couture Week Partner
            </span>
            <h3 className="text-2xl font-serif text-[#1A1A1A] mb-3">
              Place Vendôme High-Jewelry Trunk Shows
            </h3>
            <p className="text-sm text-[#5C5750] leading-relaxed mb-6">
              fashionierMind patrons receive complimentary VIP salon access to private exhibitions during Paris Fashion Week. Explore archival diamond diadems, emerald collar necklaces, and South Sea pearl suites curated to complement your bespoke bridal or gala commission.
            </p>

            <div className="bg-[#F0EAE1] p-4 border border-[#DFD7CB] mb-6 space-y-2 text-xs text-[#4A4742]">
              <div className="flex justify-between">
                <span className="font-medium">Upcoming Exhibition:</span>
                <span>Paris Haute Couture Week, July 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Atelier Location:</span>
                <span>Hôtel de Crillon, Salon des Aigles, Paris</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">VIP Admission:</span>
                <span className="text-[#8E795D] font-semibold">Complimentary for fashionierMind clients</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#8E795D] transition-colors font-medium rounded-sm"
              >
                Close Partner View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
