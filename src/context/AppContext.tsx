import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Appointment, Currency, CurrencyConfig, CustomMeasurements } from '../types';
import { PRODUCTS } from '../data/products';

const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
};

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, isCustomFit: boolean, customMeasurements?: CustomMeasurements) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  recentlyViewed: Product[];
  recordView: (productId: string) => void;

  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  cancelAppointment: (id: string) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;

  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;

  bookingModalProduct: Product | null;
  setBookingModalProduct: (p: Product | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isAdDismissed: boolean;
  setIsAdDismissed: (dismissed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'fashionierMind_cart_v1',
  WISHLIST: 'fashionierMind_wishlist_v1',
  RECENT: 'fashionierMind_recent_v1',
  APPOINTMENTS: 'fashionierMind_appointments_v1',
  CURRENCY: 'fashionierMind_currency_v1',
  AD_DISMISSED: 'fashionierMind_ad_dismissed_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed IDs
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Currency
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENCY) as Currency;
      return stored && CURRENCIES[stored] ? stored : 'USD';
    } catch {
      return 'USD';
    }
  });

  // Ad banner preference
  const [isAdDismissed, setIsAdDismissedState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AD_DISMISSED) === 'true';
    } catch {
      return false;
    }
  });

  // Modals & UI states
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [bookingModalProduct, setBookingModalProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [recentIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [appointments]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, c);
    } catch (e) {
      console.warn(e);
    }
  };

  const setIsAdDismissed = (dismissed: boolean) => {
    setIsAdDismissedState(dismissed);
    try {
      localStorage.setItem(STORAGE_KEYS.AD_DISMISSED, String(dismissed));
    } catch (e) {
      console.warn(e);
    }
  };

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    size: string,
    isCustomFit: boolean,
    customMeasurements?: CustomMeasurements
  ) => {
    const itemId = `${product.id}-${size}-${isCustomFit ? 'custom' : 'std'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          size,
          isCustomFit,
          customMeasurements,
          quantity: 1,
          addedAt: Date.now(),
        },
      ];
    });
    showToast(`Added ${product.name} (${size}) to your Shopping Bag.`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    showToast('Creation removed from your Shopping Bag.', 'info');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Creation removed from Wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        showToast(`Saved ${prod ? prod.name : 'creation'} to your Wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const recordView = (productId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  const recentlyViewed = recentIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const bookAppointment = (apt: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
    const newApt: Appointment = {
      ...apt,
      id: `APT-${Date.now().toString().slice(-6)}`,
      createdAt: Date.now(),
    };
    setAppointments((prev) => [newApt, ...prev]);
    showToast(`Private appointment requested for ${newApt.clientName} at ${newApt.salonLocation}.`);
    return newApt;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    showToast('Appointment cancelled.', 'info');
  };

  const formatPrice = (amountInUSD: number) => {
    const conf = CURRENCIES[currency];
    const converted = amountInUSD * conf.rate;
    return `${conf.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        recordView,
        appointments,
        bookAppointment,
        cancelAppointment,
        currency,
        setCurrency,
        formatPrice,
        toasts,
        showToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,
        bookingModalProduct,
        setBookingModalProduct,
        isSearchOpen,
        setIsSearchOpen,
        isAdDismissed,
        setIsAdDismissed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
