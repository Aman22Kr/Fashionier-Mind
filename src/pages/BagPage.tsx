import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Package,
  Gift,
  CheckCircle,
  X,
  CreditCard,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BagPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, formatPrice, showToast } =
    useApp();

  const [hasGiftPackaging, setHasGiftPackaging] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  // Checkout form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('France');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'concierge'>('card');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'VIPCOUTURE') {
      setAppliedDiscount(500);
      showToast('VIP Trunk Show credit of $500 applied.');
    } else {
      showToast('Invalid or expired atelier invitation code.', 'info');
    }
  };

  const finalTotal = Math.max(0, cartTotal - appliedDiscount);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) return;

    const orderNumber = `FM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      fullName,
      email,
      address: `${address}, ${city}, ${postalCode}, ${country}`,
      items: [...cart],
      total: finalTotal,
      hasGiftPackaging,
      giftNote,
      paymentMethod,
    };

    setOrderConfirmed(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order ${orderNumber} placed successfully.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-24">
      {/* Header */}
      <div className="border-b border-[#E0D7C9] pb-6 mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8E795D] font-semibold block mb-1">
          Atelier Checkout
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-normal">
          Your Shopping Bag
        </h1>
      </div>

      {orderConfirmed ? (
        /* Order Receipt State */
        <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-8 sm:p-12 max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-[#1A1A1A] text-[#C5A880] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#8E795D] font-bold block mb-1">
              Haute Couture Commission Placed
            </span>
            <h2 className="text-3xl font-serif text-[#1A1A1A]">
              Thank You, {orderConfirmed.fullName}
            </h2>
            <p className="text-xs text-[#6B655C] mt-2">
              Order Reference: <strong className="font-mono text-[#1A1A1A]">{orderConfirmed.orderNumber}</strong>
            </p>
          </div>

          <div className="bg-[#F5F1EB] p-6 text-xs text-left space-y-3 border border-[#DDD6CB]">
            <div className="flex justify-between border-b border-[#E0D7C9] pb-2">
              <span className="text-[#6B655C]">Delivery Address:</span>
              <span className="font-medium text-[#1A1A1A] text-right">{orderConfirmed.address}</span>
            </div>
            <div className="flex justify-between border-b border-[#E0D7C9] pb-2">
              <span className="text-[#6B655C]">White-Glove Courier:</span>
              <span className="font-medium text-[#1A1A1A]">Dedicated Atelier Handler</span>
            </div>
            <div className="flex justify-between border-b border-[#E0D7C9] pb-2">
              <span className="text-[#6B655C]">Total Investment:</span>
              <span className="font-mono font-bold text-sm text-[#1A1A1A]">
                {formatPrice(orderConfirmed.total)}
              </span>
            </div>
            {orderConfirmed.hasGiftPackaging && (
              <p className="text-[11px] text-[#8E795D] italic">
                Complimentary archival garment trunk & handwritten calligraphy card prepared.
              </p>
            )}
          </div>

          <div className="p-4 bg-[#EFE9DF] text-[11px] text-[#7A7468] leading-relaxed">
            <strong>Demonstration Notice:</strong> This is a client-side simulation. No financial charge was made. Your order summary is stored in browser memory.
          </div>

          <div>
            <Link
              to="/collections"
              className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm inline-block"
            >
              Return To Collections
            </Link>
          </div>
        </div>
      ) : cart.length === 0 ? (
        /* Empty Bag */
        <div className="bg-[#FAF8F5] border border-[#DDD6CB] p-16 text-center space-y-4 max-w-xl mx-auto my-12">
          <ShoppingBag className="w-10 h-10 text-[#C5A880] mx-auto opacity-70" />
          <h3 className="text-2xl font-serif text-[#1A1A1A]">Your Bag Is Empty</h3>
          <p className="text-xs text-[#6B655C] leading-relaxed">
            Your fashionierMind shopping bag is currently unoccupied. Discover our latest bridal and evening couture arrivals.
          </p>
          <div className="pt-2">
            <Link
              to="/collections"
              className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm inline-flex items-center gap-2"
            >
              <span>Explore Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Active Bag Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Cart items list (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="divide-y divide-[#E0D7C9] border-y border-[#E0D7C9]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex gap-4 sm:gap-6">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 sm:w-24 aspect-[3/4] object-cover bg-[#E8E2D9] rounded-sm shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#8E795D] font-semibold">
                            {item.product.silhouette}
                          </span>
                          <h3 className="text-lg font-serif text-[#1A1A1A] font-medium">
                            <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                          </h3>
                        </div>
                        <span className="text-sm font-mono font-semibold text-[#1A1A1A] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#6B655C]">
                        <span>Size: <strong className="text-[#1A1A1A]">{item.size}</strong></span>
                        {item.isCustomFit && (
                          <span className="bg-[#EAE4D9] text-[#1A1A1A] px-2 py-0.5 text-[10px] font-semibold uppercase">
                            Made-To-Measure Measurements Attached
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD6CB] bg-white rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-[#6B655C] hover:text-[#1A1A1A]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-[#6B655C] hover:text-[#1A1A1A]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-[#999] hover:text-[#B00020] inline-flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Options Module */}
            <div className="bg-[#FAF5ED] border border-[#DDD6CB] p-6 space-y-4 rounded-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasGiftPackaging}
                  onChange={(e) => setHasGiftPackaging(e.target.checked)}
                  className="rounded border-[#DDD6CB] text-[#1A1A1A] focus:ring-0"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#8E795D]" />
                  <span>Complimentary Archival Gift Trunk & Calligraphy Card</span>
                </span>
              </label>

              {hasGiftPackaging && (
                <div className="pl-6 pt-2">
                  <textarea
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your personalized handwritten note for the recipient..."
                    className="w-full bg-white border border-[#DDD6CB] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary & Checkout Trigger (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#DDD6CB] p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-serif text-[#1A1A1A] border-b border-[#E0D7C9] pb-4">
              Summary of Investment
            </h3>

            {/* Subtotal & Details */}
            <div className="space-y-3 text-xs text-[#524E48]">
              <div className="flex justify-between">
                <span>Creations Subtotal:</span>
                <span className="font-mono tabular-nums text-[#1A1A1A] font-semibold">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove International Delivery:</span>
                <span className="text-[#8E795D] font-semibold uppercase text-[11px]">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between">
                <span>Atelier Fitting & Alterations:</span>
                <span className="text-[#8E795D] font-semibold uppercase text-[11px]">
                  Included
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#8E795D]">
                  <span>VIP Trunk Show Credit:</span>
                  <span className="font-mono font-semibold">-{formatPrice(appliedDiscount)}</span>
                </div>
              )}

              <div className="pt-4 border-t border-[#E0D7C9] flex justify-between items-baseline text-sm">
                <span className="font-serif font-bold text-base text-[#1A1A1A]">Total Investment:</span>
                <span className="font-mono font-bold text-xl text-[#1A1A1A] tabular-nums">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="VIP Code (Try: VIPCOUTURE)"
                  className="flex-1 bg-white border border-[#DDD6CB] px-3 py-2 text-xs uppercase text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8E795D] transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Checkout Action */}
            <div className="pt-2">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm shadow-md"
              >
                Proceed To Secure Checkout
              </button>
            </div>

            <div className="pt-4 border-t border-[#E0D7C9] space-y-2 text-[11px] text-[#7A7468]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8E795D]" />
                <span>Encrypted 256-Bit SSL Atelier Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#8E795D]" />
                <span>Delivered in Acid-Free Monogrammed Cotton Trunk</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#FAF8F5] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#DFD7CB] shadow-2xl relative my-auto animate-in fade-in duration-200">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#7A766E] hover:text-[#1A1A1A]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#8E795D] font-bold block mb-1">
              fashionierMind Private Salon Checkout
            </span>
            <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">
              Finalize Commission Order
            </h3>

            <div className="bg-[#F0EAE1] p-3 text-xs text-[#524E48] mb-6 border border-[#DDD6CB]">
              <strong>Demo Checkout:</strong> No real payment is billed. All details survive in browser localStorage.
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Madame de Pompadour"
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@gmail.com"
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street and Avenue or Hotel Suite"
                  className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Paris"
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="75001"
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-1">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-[#DDD6CB] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8E795D]"
                  >
                    <option value="France">France</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#4A4742] uppercase tracking-wider text-[11px] font-semibold mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card' },
                    { id: 'wire', label: 'Bank Wire' },
                    { id: 'concierge', label: 'Concierge Pay' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-2.5 text-xs text-center border rounded-sm transition-all ${
                        paymentMethod === pm.id
                          ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-semibold'
                          : 'border-[#DDD6CB] bg-white text-[#555]'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#DDD6CB] flex justify-between items-center text-sm">
                <span className="font-medium text-[#1A1A1A]">Total Due:</span>
                <span className="font-mono font-bold text-lg text-[#1A1A1A]">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E795D] transition-colors rounded-sm shadow-sm"
                >
                  Place Haute Couture Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
