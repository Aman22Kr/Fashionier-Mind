import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { SALONS } from '../data/products';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState(() => localStorage.getItem('fashionierMind_contact_name') || '');
  const [email, setEmail] = useState(() => localStorage.getItem('fashionierMind_contact_email') || '');
  const [salon, setSalon] = useState('Paris - Place Vendôme');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    localStorage.setItem('fashionierMind_contact_name', name);
    localStorage.setItem('fashionierMind_contact_email', email);

    setSubmitted(true);
    showToast('Concierge inquiry sent. Our directrice will contact you shortly.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8E795D] font-semibold block">
          Private Client Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] font-normal">
          Flagship Salons & Concierge
        </h1>
        <p className="text-sm text-[#6B655C] leading-relaxed font-light">
          Whether organizing an intimate bridal fitting in Paris or requesting our flying master couturier for an international wedding, our concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Salon Locations (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-2xl font-serif text-[#1A1A1A] border-b border-[#E0D7C9] pb-3">
            Maison Addresses
          </h2>

          <div className="space-y-6">
            {SALONS.map((s) => (
              <div
                key={s.city}
                className="bg-[#FAF8F5] border border-[#DDD6CB] p-6 sm:p-8 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#8E795D] font-semibold block">
                      {s.city} Flagship
                    </span>
                    <h3 className="text-xl font-serif text-[#1A1A1A]">{s.name}</h3>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-[#1A1A1A] bg-[#ECE5D9] px-2.5 py-1 font-semibold rounded-sm">
                    By Appointment
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#524E48] pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8E795D] shrink-0" />
                    <span>{s.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#8E795D] shrink-0" />
                    <span>{s.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#8E795D] shrink-0" />
                    <span className="font-mono text-[#1A1A1A]">{s.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#8E795D] shrink-0" />
                    <span className="text-[#8E795D]">{s.email}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E2D9] flex flex-wrap gap-2">
                  {s.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase tracking-wider bg-white border border-[#DDD6CB] px-2 py-0.5 text-[#6B655C]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concierge Message Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#DDD6CB] p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8E795D] font-semibold block mb-1">
              Direct Inquiries
            </span>
            <h3 className="text-2xl font-serif text-[#1A1A1A]">
              Connect With the Directrice
            </h3>
            <p className="text-xs text-[#6B655C] mt-1">
              Inquiries are answered within 4 hours by our senior salon directrice.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-[#F2EDE4] border border-[#DDD6CB] space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#8E795D] mx-auto" />
              <h4 className="font-serif text-lg text-[#1A1A1A]">Message Transmitted</h4>
              <p className="text-xs text-[#6B655C]">
                Thank you, {name}. Our atelier concierge has received your note and will contact you via {email}.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="text-xs uppercase tracking-wider text-[#8E795D] underline font-semibold mt-2"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Madame or Monsieur"
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Preferred Salon
                </label>
                <select
                  value={salon}
                  onChange={(e) => setSalon(e.target.value)}
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                >
                  <option value="Paris - Place Vendôme">Paris - Place Vendôme Flagship</option>
                  <option value="New York - Madison Ave">New York - Madison Ave Salon</option>
                  <option value="London - Mayfair">London - Mayfair Townhouse</option>
                  <option value="International Flying Couturier">International Flying Couturier (Private Travel)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Message / Special Request *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your event date, silhouette interests, or consultation questions..."
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit To Concierge</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
