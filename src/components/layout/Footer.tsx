import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('fashionierMind_newsletter_subscribed') === 'true';
  });
  const { showToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid luxury patron email address.', 'info');
      return;
    }
    localStorage.setItem('fashionierMind_newsletter_subscribed', 'true');
    localStorage.setItem('fashionierMind_newsletter_email', email);
    setIsSubscribed(true);
    showToast('Welcome to the fashionierMind Private Atelier Gazette.');
  };

  return (
    <footer className="bg-[#121212] text-[#E0DDD7] border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-[#F5F2EB] block hover:text-[#C5A880] transition-colors"
            >
              fashionierMind
            </Link>
            <p className="text-sm text-[#9E9A91] leading-relaxed max-w-sm">
              An independent French haute couture maison dedicated to sculptural bridal architecture, red-carpet eveningwear, and bespoke hand-embroidery crafted in our private salons.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#C5A880] block font-medium mb-1">
                Private Salon By Appointment Only
              </span>
              <p className="text-xs text-[#807C74]">
                Paris (Place Vendôme) · New York (Madison Ave) · London (Mayfair)
              </p>
            </div>
          </div>

          {/* Col 1: Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F2EB] mb-5">
              Collections
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#9E9A91]">
              <li>
                <Link to="/collections?cat=bridal" className="hover:text-[#F5F2EB] transition-colors">
                  Haute Couture Bridal
                </Link>
              </li>
              <li>
                <Link to="/collections?cat=evening" className="hover:text-[#F5F2EB] transition-colors">
                  Gala & Evening Gowns
                </Link>
              </li>
              <li>
                <Link to="/collections?cat=resort" className="hover:text-[#F5F2EB] transition-colors">
                  Riviera Resort & Plissé
                </Link>
              </li>
              <li>
                <Link to="/collections?cat=accessories" className="hover:text-[#F5F2EB] transition-colors">
                  Cathedral Capes & Veils
                </Link>
              </li>
              <li>
                <Link to="/runway" className="hover:text-[#F5F2EB] transition-colors">
                  SS26 Runway Showreel
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Atelier & Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F2EB] mb-5">
              Maison & Services
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#9E9A91]">
              <li>
                <Link to="/atelier" className="hover:text-[#F5F2EB] transition-colors">
                  The Savoir-Faire
                </Link>
              </li>
              <li>
                <Link to="/bespoke" className="hover:text-[#F5F2EB] transition-colors">
                  Bespoke Made-to-Measure
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-[#F5F2EB] transition-colors">
                  Book Salon Fitting
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5F2EB] transition-colors">
                  Salons & Concierge
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F5F2EB] transition-colors">
                  Couture Preservation & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: VIP Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F2EB] mb-5">
              The Gazette
            </h4>
            <p className="text-xs text-[#9E9A91] mb-4 leading-relaxed">
              Receive private invitations to seasonal Paris trunk shows and bespoke archive releases.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#C5A880] bg-[#1E1E1E] p-3 border border-[#333]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are registered for private salon invitations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your patron email"
                    className="w-full bg-[#1A1A1A] border border-[#333] text-xs text-[#F5F2EB] px-3 py-2.5 pr-10 focus:outline-none focus:border-[#C5A880] transition-colors placeholder:text-[#666]"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter subscription"
                    className="absolute right-1 top-1 bottom-1 px-2.5 text-[#9E9A91] hover:text-[#F5F2EB] transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#666] block">
                  Strictly confidential. No automated marketing.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar with GitHub deployment credit */}
        <div className="mt-16 pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A766E]">
          <p>© {new Date().getFullYear()} fashionierMind Couture Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
            <span>Static Deployment on GitHub Pages</span>
            <span>·</span>
            <span className="text-[#A39988]">Curated for GitHub: Aman22kr</span>
            <span>·</span>
            <Link to="/faq" className="hover:text-[#F5F2EB] transition-colors">
              Care & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
