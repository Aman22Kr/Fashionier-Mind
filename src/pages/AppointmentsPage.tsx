import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Trash2, Shield, User, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';
import { SALONS } from '../data/products';

export const AppointmentsPage: React.FC = () => {
  const { appointments, bookAppointment, cancelAppointment } = useApp();

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [salonLocation, setSalonLocation] = useState<Appointment['salonLocation']>(
    'Paris - Place Vendôme'
  );
  const [serviceType, setServiceType] = useState<Appointment['serviceType']>(
    'Bridal Couture Fitting'
  );
  const [preferredDate, setPreferredDate] = useState('2026-05-12');
  const [preferredTime, setPreferredTime] = useState('14:30');
  const [notes, setNotes] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email || !preferredDate) return;

    const newApt = bookAppointment({
      clientName,
      email,
      phone,
      salonLocation,
      serviceType,
      preferredDate,
      preferredTime,
      notes,
      eventDate,
    });

    setSuccessId(newApt.id);
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8E795D] font-semibold block">
          Private Client Concierge
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] font-normal">
          Book a Salon Appointment
        </h1>
        <p className="text-sm text-[#6B655C] leading-relaxed font-light">
          Reserve your private 90-minute bespoke consultation at our Paris, New York, or London townhouses, or request a live virtual styling session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Booking Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#DDD6CB] p-6 sm:p-10 shadow-sm">
          {successId && (
            <div className="mb-8 p-4 bg-[#F2EDE4] border border-[#DDD6CB] flex items-center justify-between text-xs text-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#8E795D]" />
                <div>
                  <strong>Appointment {successId} confirmed!</strong>
                  <p className="text-[#6B655C]">Recorded in your local appointments list below.</p>
                </div>
              </div>
              <button
                onClick={() => setSuccessId(null)}
                className="text-[11px] uppercase tracking-wider text-[#8E795D] underline font-semibold"
              >
                Dismiss
              </button>
            </div>
          )}

          <h2 className="text-2xl font-serif text-[#1A1A1A] mb-6">
            Consultation Request
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Patron Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor@domain.com"
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Telephone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Wedding or Event Date (If Known)
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                Atelier Location *
              </label>
              <select
                value={salonLocation}
                onChange={(e) => setSalonLocation(e.target.value as any)}
                className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
              >
                <option value="Paris - Place Vendôme">Paris - Place Vendôme Flagship (Private Salon)</option>
                <option value="New York - Madison Ave">New York - Madison Avenue Townhouse</option>
                <option value="London - Mayfair">London - Mayfair Salon</option>
                <option value="Virtual Video Concierge">Virtual Video Concierge (Live Private Styling Session)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                Service Requested *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as any)}
                className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
              >
                <option value="Bridal Couture Fitting">Haute Couture Bridal Fitting (90 Mins)</option>
                <option value="Gala & Evening Wear">Red Carpet & Gala Eveningwear Discovery (60 Mins)</option>
                <option value="Bespoke Custom Commission">Bespoke Custom Made-to-Measure Commission</option>
                <option value="Alteration & Preservation">Couture Alterations & Heirloom Preservation</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Preferred Time Slot *
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                >
                  <option value="11:00">11:00 AM (Morning Salon)</option>
                  <option value="14:30">02:30 PM (Afternoon Fitting)</option>
                  <option value="16:30">04:30 PM (Late Afternoon)</option>
                  <option value="18:00">06:00 PM (Private Evening)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                Gown Preferences or Special Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any specific gowns from the collection you wish to try on, or styling considerations..."
                className="w-full bg-white border border-[#DDD6CB] px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm shadow-sm"
              >
                Confirm Salon Reservation
              </button>
            </div>
          </form>
        </div>

        {/* Saved Appointments & Salon Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Active Appointments List (localStorage) */}
          <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-6 sm:p-8">
            <h3 className="text-xl font-serif text-[#1A1A1A] mb-4 flex items-center justify-between">
              <span>Your Salon Itinerary</span>
              <span className="text-xs font-sans text-[#8C8273] font-normal">
                {appointments.length} Scheduled
              </span>
            </h3>

            {appointments.length === 0 ? (
              <div className="text-center py-8 text-[#8C8273] border border-dashed border-[#DDD6CB] p-6 text-xs">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No appointments booked yet.</p>
                <p className="text-[11px] text-[#A39988] mt-1">
                  Your submitted bookings are safely saved to your browser storage.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 bg-[#F5F1EB] border border-[#DDD6CB] space-y-2 text-xs relative group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-mono text-[#8E795D] font-bold block">
                          Ref: {apt.id}
                        </span>
                        <h4 className="font-serif text-base text-[#1A1A1A] font-medium">
                          {apt.serviceType}
                        </h4>
                      </div>
                      <button
                        onClick={() => cancelAppointment(apt.id)}
                        title="Cancel appointment"
                        className="text-[#999] hover:text-[#B00020] p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[#524E48] space-y-1 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#8E795D]" />
                        <span>{apt.salonLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#8E795D]" />
                        <span>{apt.preferredDate} at {apt.preferredTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-[#8E795D]" />
                        <span>Client: {apt.clientName}</span>
                      </div>
                      {apt.notes && (
                        <p className="italic text-[#777] pt-1">"{apt.notes}"</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Salon Details Box */}
          <div className="bg-[#FAF5ED] border border-[#DDD6CB] p-6 space-y-4 text-xs text-[#524E48]">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">
              What To Expect at Your Fitting
            </h4>
            <ul className="space-y-2 text-[11px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#8E795D] font-bold">·</span>
                <span>Private salon reserved solely for you and your guests.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8E795D] font-bold">·</span>
                <span>Complimentary vintage Champagne and French macarons served.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8E795D] font-bold">·</span>
                <span>Try sample gowns in your silhouette and inspect raw silk swatches.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8E795D] font-bold">·</span>
                <span>Zero consultation fee; appointments are non-binding.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
