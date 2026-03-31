export interface Car {
  id: number;
  name: string;
  category: 'LUXURY' | 'SUV' | 'SEDAN' | 'VAN';
  price: string;
  image: string;
  images: string[];
  specs: {
    passengers: string;
    transmission: string;
    luggage: string;
    fuel: string;
    mileage?: string;
    engine?: string;
  };
  features: string[];
  description: string;
  rating: number;
  reviews: number;
  available: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
}

export type BookingType = 'ride' | 'rental';
export type PaymentMethod = 'credit_card' | 'momo' | 'paypal' | 'bank_transfer';

export interface SelectedCarInstance {
  instanceId: string;
  carId: number;
}
