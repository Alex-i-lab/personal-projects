import { Car } from '../types';

export const cars: Car[] = [
  {
    id: 1,
    name: 'Toyota Land Cruiser V8',
    category: 'LUXURY',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '7 Adults',
      transmission: 'Automatic',
      luggage: '4 Large Bags',
      fuel: 'Diesel',
      engine: '4.5L V8 Diesel',
      mileage: '10 km/l'
    },
    features: ['4WD', 'Leather Interior', 'Climate Control', 'Sunroof', 'Premium Audio', 'Reverse Camera'],
    description: 'The Toyota Land Cruiser V8 is the ultimate luxury SUV, combining legendary off-road capability with premium comfort. Perfect for both city cruising and adventurous upcountry trips in Rwanda.',
    rating: 4.9,
    reviews: 124,
    available: true,
    isPopular: true
  },
  {
    id: 2,
    name: 'Volkswagen ID.4',
    category: 'SUV',
    price: '$70',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621932953986-15fcf084da0f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1623046418924-d9bb2403521e?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '5 Adults',
      transmission: 'Automatic',
      luggage: '3 Large Bags',
      fuel: 'Electric',
      engine: 'Electric Motor',
      mileage: '520 km Range'
    },
    features: ['Zero Emissions', 'Touchscreen Infotainment', 'Lane Assist', 'Ambient Lighting', 'Wireless Charging', 'Panoramic Roof'],
    description: 'Experience the future of driving with the all-electric Volkswagen ID.4. Smooth, quiet, and packed with modern technology, it\'s the perfect companion for an eco-friendly city exploration.',
    rating: 4.8,
    reviews: 89,
    available: true,
    isNew: true
  },
  {
    id: 3,
    name: 'Toyota RAV4',
    category: 'SUV',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '5 Adults',
      transmission: 'Automatic',
      luggage: '3 Large Bags',
      fuel: 'Petrol',
      mileage: '14 km/l'
    },
    features: ['AWD', 'Spacious Cargo', 'Bluetooth', 'Reverse Camera', 'Cruise Control', 'Blind Spot Monitor'],
    description: 'The Toyota RAV4 is a versatile and reliable SUV that\'s perfect for family trips. With its spacious interior and advanced safety features, you can explore Rwanda with peace of mind.',
    rating: 4.7,
    reviews: 156,
    available: true
  },
  {
    id: 4,
    name: 'Mercedes-Benz E-Class',
    category: 'LUXURY',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '4 Adults',
      transmission: 'Automatic',
      luggage: '2 Large Bags',
      fuel: 'Petrol',
      engine: '2.0L Turbo',
      mileage: '12 km/l'
    },
    features: ['Executive Seating', 'Soft Close Doors', 'Premium Audio', 'Air Suspension', 'Ambient Lighting', 'Active Parking Assist'],
    description: 'The Mercedes-Benz E-Class defines executive luxury. With its sophisticated design and cutting-edge technology, it provides an unparalleled level of comfort and style for your business or leisure travel.',
    rating: 5.0,
    reviews: 42,
    available: true
  },
  {
    id: 5,
    name: 'Toyota Prado TXL',
    category: 'SUV',
    price: '$110',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '7 Adults',
      transmission: 'Automatic',
      luggage: '4 Large Bags',
      fuel: 'Diesel',
      mileage: '11 km/l'
    },
    features: ['4WD', 'Robust Suspension', 'Large Trunk', 'Reliable Performance', 'Climate Control', 'Side Steps'],
    description: 'The Toyota Prado TXL is a rugged and dependable SUV, built to handle any terrain. Its spacious 7-seat configuration makes it ideal for group travel and exploring the beautiful landscapes of Rwanda.',
    rating: 4.6,
    reviews: 210,
    available: true
  },
  {
    id: 6,
    name: 'Toyota Hiace (Drone)',
    category: 'VAN',
    price: '$100',
    image: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562620644-65bb4d99484d?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '14 Adults',
      transmission: 'Manual',
      luggage: '6 Large Bags',
      fuel: 'Diesel',
      engine: '2.5L Diesel',
      mileage: '9 km/l'
    },
    features: ['High Roof', 'Air Conditioning', 'Ample Legroom', 'Group Travel Ready', 'Sliding Door', 'Rear Step'],
    description: 'The Toyota Hiace, affectionately known as the "Drone", is the go-to choice for group transportation. With seating for up to 14 people, it\'s perfect for corporate retreats, large family outings, or tour groups.',
    rating: 4.5,
    reviews: 340,
    available: true
  },
  {
    id: 7,
    name: 'Volkswagen Polo',
    category: 'SEDAN',
    price: '$50',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '5 Adults',
      transmission: 'Automatic',
      luggage: '2 Large Bags',
      fuel: 'Petrol',
      mileage: '18 km/l'
    },
    features: ['Compact Size', 'Fuel Efficient', 'Modern Interior', 'Easy Parking', 'Bluetooth', 'Touchscreen'],
    description: 'The Volkswagen Polo is a stylish and economical choice for city driving. Its compact size makes it easy to navigate and park in Kigali, while its fuel efficiency keeps your travel costs low.',
    rating: 4.4,
    reviews: 178,
    available: true
  },
  {
    id: 8,
    name: 'BMW 7 Series',
    category: 'LUXURY',
    price: '$200',
    image: 'https://images.unsplash.com/photo-1555353540-64fd8b028b17?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1555353540-64fd8b028b17?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      passengers: '4 Adults',
      transmission: 'Automatic',
      luggage: '2 Large Bags',
      fuel: 'Petrol',
      engine: '3.0L TwinPower Turbo',
      mileage: '11 km/l'
    },
    features: ['Massage Seats', 'Rear Entertainment', 'Air Suspension', 'Soft Close Doors', 'Gesture Control', 'Harman Kardon Sound'],
    description: 'The BMW 7 Series represents the pinnacle of luxury and innovation. It offers a smooth, powerful ride and an interior that feels like a private lounge, making every journey an extraordinary experience.',
    rating: 4.9,
    reviews: 65,
    available: true
  }
];
