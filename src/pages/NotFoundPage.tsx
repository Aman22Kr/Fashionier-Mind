import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center space-y-6">
      <div className="w-16 h-16 bg-[#FAF5ED] border border-[#DDD6CB] rounded-full flex items-center justify-center mx-auto text-[#8E795D]">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-[0.3em] text-[#8E795D] font-semibold block">
        404 Haute Couture Archive
      </span>

      <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] font-normal">
        Page Not Found
      </h1>

      <p className="text-sm text-[#6B655C] max-w-md mx-auto leading-relaxed">
        The archive page or bespoke piece you are seeking is either in private preservation or has moved to our current runway collection.
      </p>

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm"
        >
          Return Home
        </Link>
        <Link
          to="/collections"
          className="px-6 py-3 border border-[#DDD6CB] text-[#1A1A1A] text-xs uppercase tracking-widest font-medium hover:border-[#1A1A1A] transition-colors rounded-sm inline-flex items-center gap-2"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
