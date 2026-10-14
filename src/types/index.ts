export type CategoryType = 'bridal' | 'evening' | 'resort' | 'accessories';

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  price: number;
  silhouette: string;
  fabric: string;
  color: string;
  colorHex: string;
  atelierHours: number;
  season: string;
  isNew?: boolean;
  isBespokeOnly?: boolean;
  featured?: boolean;
  images: string[];
  description: string;
  details: string[];
  care: string[];
  sizes: string[];
}

export interface CustomMeasurements {
  bust: string;
  waist: string;
  hips: string;
  hollowToHem: string;
  height: string;
  notes?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  isCustomFit: boolean;
  customMeasurements?: CustomMeasurements;
  quantity: number;
  addedAt: number;
}

export interface Appointment {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  salonLocation: 'Paris - Place Vendôme' | 'New York - Madison Ave' | 'London - Mayfair' | 'Virtual Video Concierge';
  serviceType: 'Bridal Couture Fitting' | 'Gala & Evening Wear' | 'Bespoke Custom Commission' | 'Alteration & Preservation';
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  eventDate?: string;
  createdAt: number;
}

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // vs USD
}
