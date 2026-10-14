import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Appointment } from '../../types';

export const BookFittingModal: React.FC = () => {
  const { bookingModalProduct, setBookingModalProduct, bookAppointment } = useApp();

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salonLocation, setSalonLocation] = useState<Appointment['salonLocation']>(
    'Paris - Place Vendôme'
  );
  const [serviceType, setServiceType] = useState<Appointment['serviceType']>(
    bookingModalProduct?.category === 'bridal' ? 'Bridal Couture Fitting' : 'Gala & Evening Wear'
  );
  const [preferredDate, setPreferredDate] = useState('2026-04-15');
  const [preferredTime, setPreferredTime] = useState('14:30');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState(
    bookingModalProduct ? `Inquiring about fitting for: ${bookingModalProduct.name} (${bookingModalProduct.subtitle})` : ''
  );
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);

  if (!bookingModalProduct && !confirmedApt) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email || !preferredDate) return;

    const apt = bookAppointment({
      clientName,
      email,
      phone,
      salonLocation,
      serviceType,
      preferredDate,
      preferredTime,
      eventDate,
      notes,
    });
    setConfirmedApt(apt);
  };

  const handleClose = () => {
    setBookingModalProduct(null);
    setConfirmedApt(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#DFD7CB] shadow-2xl relative my-auto animate-in fade-in duration-200">
        <button
          onClick={handleClose}
          aria-label="Close booking modal"
          className="absolute top-4 right-4 p-2 text-[#7A766E] hover:text-[#1A1A1A]"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedApt ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-[#8E795D] text-white rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif text-[#1A1A1A]">
              Salon Appointment Requested
            </h3>
            <p className="text-xs text-[#5C5750] leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-[#1A1A1A]">{confirmedApt.clientName}</strong>. Our senior couture concierge has received your request.
            </p>
            <div className="bg-[#F3EFE9] border border-[#DDD6CB] p-4 text-xs text-left space-y-2 text-[#4A4742]">
              <div className="flex justify-between">
                <span className="font-semibold">Reference:</span>
                <span className="font-mono">{confirmedApt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Salon:</span>
                <span>{confirmedApt.salonLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date & Time:</span>
                <span>{confirmedApt.preferredDate} at {confirmedApt.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Service:</span>
                <span>{confirmedApt.serviceType}</span>
              </div>
            </div>
            <p className="text-[11px] text-[#8C8273]">
              A private salon confirmation has been recorded in your local browser appointments manager.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#8E795D] font-bold block mb-1">
                fashionierMind Atelier Private Consultation
              </span>
              <h3 className="text-2xl font-serif text-[#1A1A1A]">
                Reserve a Salon Fitting
              </h3>
              {bookingModalProduct && (
                <p className="text-xs text-[#6B655C] mt-1">
                  Creation: <strong className="text-[#1A1A1A]">{bookingModalProduct.name}</strong> ({bookingModalProduct.silhouette})
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                  Patron Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Marie-Claire Dupont"
                  className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                  Salon Location *
                </label>
                <select
                  value={salonLocation}
                  onChange={(e) => setSalonLocation(e.target.value as any)}
                  className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                >
                  <option value="Paris - Place Vendôme">Paris - Place Vendôme Flagship Atelier</option>
                  <option value="New York - Madison Ave">New York - Madison Avenue Salon</option>
                  <option value="London - Mayfair">London - Mayfair Townhouse</option>
                  <option value="Virtual Video Concierge">Virtual Video Concierge (Live Private Styling)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                    Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  >
                    <option value="11:00">11:00 AM (Morning Salon)</option>
                    <option value="14:30">02:30 PM (Afternoon Fitting)</option>
                    <option value="17:00">05:00 PM (Sunset VIP Session)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                  Wedding / Gala Event Date (Optional)
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-medium mb-1">
                  Atelier Notes / Custom Fitting Requests
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1A1A1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm"
                >
                  Confirm Salon Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
