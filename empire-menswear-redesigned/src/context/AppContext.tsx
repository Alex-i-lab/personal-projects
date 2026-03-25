import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { PRODUCTS, ITEMS_PER_PAGE } from '../constants';
import * as codes from 'currency-codes';
import Cookies from 'js-cookie';
import { fetchProducts } from '../services/sanityService';
import { isSanityConfigured } from '../lib/sanity';
// Firebase imports removed

export interface Currency {
  code: string;
  symbol: string;
  rate: number;
  label: string;
}

// Default currencies as fallback
export const DEFAULT_CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1, label: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥', rate: 151.41, label: 'Japanese Yen' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.53, label: 'Australian Dollar' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.36, label: 'Canadian Dollar' },
};

interface AppContextType {
  cart: any[];
  addToCart: (product: any, size: string) => void;
  updateQuantity: (title: string, size: string, delta: number) => void;
  removeFromCart: (title: string, size: string) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  selectedProductForReviews: any;
  setSelectedProductForReviews: (product: any) => void;
  quickViewProduct: any;
  setQuickViewProduct: (product: any) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  clearCart: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceStr: string | number) => string;
  allCurrencies: Currency[];
  isLoadingRates: boolean;
  products: any[];
  isLoadingProducts: boolean;
  placeOrder: (shippingAddress: any) => Promise<any>;
  wishlist: any[];
  toggleWishlist: (product: any) => void;
  isInWishlist: (title: string) => boolean;
  reviews: any[];
  isLoadingReviews: boolean;
  addReview: (rating: number, comment: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [selectedProductForReviews, setSelectedProductForReviews] = useState<any>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCIES.USD);
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>(Object.values(DEFAULT_CURRENCIES));
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [products, setProducts] = useState<any[]>(PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Auth listener removed
  useEffect(() => {
  }, []);

  const placeOrder = async (shippingAddress: any) => {
    // Firebase removal: Simulating successful order placement
    console.log("Simulating order placement with address:", shippingAddress);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockOrder = {
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: cart,
      total: cartTotal,
      currency: currency.code,
      shippingAddress,
      status: 'pending',
      createdAt: { seconds: Math.floor(Date.now() / 1000) }
    };
    
    clearCart();
    return mockOrder;
  };

  const toggleWishlist = (product: any) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.title === product.title);
      if (exists) {
        return prev.filter(item => item.title !== product.title);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (title: string) => {
    return wishlist.some(item => item.title === title);
  };
  
  // Review handling - Firebase removal: using static reviews from constants
  useEffect(() => {
    if (selectedProductForReviews) {
      setReviews(selectedProductForReviews.reviews || []);
    } else {
      setReviews([]);
    }
  }, [selectedProductForReviews]);

  const addReview = async (rating: number, comment: string) => {
    if (!selectedProductForReviews) return;

    // Firebase removal: Simulating review submission
    console.log("Simulating review submission:", { rating, comment });
    
    const newReview = {
      user: 'Anonymous',
      rating,
      text: comment
    };

    setReviews(prev => [newReview, ...prev]);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
  };

  // Fetch products from Sanity if configured
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const sanityProducts = await fetchProducts();
        if (sanityProducts && sanityProducts.length > 0) {
          setProducts(sanityProducts);
        } else {
          setProducts(PRODUCTS);
        }
      } catch (error) {
        setProducts(PRODUCTS);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  // Fetch exchange rates and build wide currency list
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoadingRates(true);
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        
        if (data && data.rates) {
          const rates = data.rates;
          const wideCurrencies: Currency[] = codes.codes().map(code => {
            const currencyInfo = codes.code(code);
            const rate = rates[code] || 1;
            
            // Try to get symbol using Intl
            let symbol = code;
            try {
              const parts = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: code,
              }).formatToParts(1);
              const symbolPart = parts.find(p => p.type === 'currency');
              if (symbolPart) symbol = symbolPart.value;
            } catch (e) {
              // Fallback to code
            }

            return {
              code,
              symbol,
              rate,
              label: currencyInfo ? currencyInfo.currency : code
            };
          }).filter(c => rates[c.code]); // Only include currencies we have rates for

          setAllCurrencies(wideCurrencies);

          // Update current currency with new rate if it exists
          const savedCurrencyCode = Cookies.get('preferred_currency');
          const currentCode = savedCurrencyCode || currency.code;
          const updatedCurrent = wideCurrencies.find(c => c.code === currentCode);
          if (updatedCurrent) {
            setCurrency(updatedCurrent);
          }
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
        // Fallback to defaults already in state
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

  // Detect currency based on locale on initial load (only if not already set by fetch)
  useEffect(() => {
    if (!Cookies.get('preferred_currency')) {
      try {
        const locale = navigator.language;
        let detectedCode = 'USD';
        if (locale.includes('GB')) detectedCode = 'GBP';
        else if (locale.includes('JP')) detectedCode = 'JPY';
        else if (locale.includes('AU')) detectedCode = 'AUD';
        else if (locale.includes('CA')) detectedCode = 'CAD';
        else if (['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'FI', 'IE', 'PT', 'GR'].some(c => locale.includes(c))) detectedCode = 'EUR';
        
        const detected = allCurrencies.find(c => c.code === detectedCode);
        if (detected) setCurrency(detected);
      } catch (e) {
        console.error("Failed to detect locale currency", e);
      }
    }
  }, [allCurrencies.length]);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    Cookies.set('preferred_currency', newCurrency.code, { 
      expires: 365, 
      sameSite: 'none', 
      secure: true 
    });
  };

  const formatPrice = (priceInput: string | number) => {
    let numericPrice: number;
    if (typeof priceInput === 'string') {
      numericPrice = parseFloat(priceInput.replace(/[^0-9.]/g, ''));
    } else {
      numericPrice = priceInput;
    }

    const converted = numericPrice * currency.rate;
    
    return new Intl.NumberFormat(navigator.language || 'en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);
  };

  const addToCart = (product: any, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.title === product.title && item.size === size);
      if (existing) {
        return prev.map(item => 
          (item.title === product.title && item.size === size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (title: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.title === title && item.size === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (title: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.title === title && item.size === size)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart, addToCart, updateQuantity, removeFromCart, cartTotal, cartCount,
      isCartOpen, setIsCartOpen, isCheckoutOpen, setIsCheckoutOpen,
      checkoutStep, setCheckoutStep, selectedProductForReviews, setSelectedProductForReviews,
      quickViewProduct, setQuickViewProduct,
      isMenuOpen, setIsMenuOpen,
      isSearchOpen, setIsSearchOpen,
      clearCart,
      currency,
      setCurrency: handleSetCurrency,
      formatPrice,
      allCurrencies,
      isLoadingRates,
      products,
      isLoadingProducts,
      placeOrder,
      wishlist,
      toggleWishlist,
      isInWishlist,
      reviews,
      isLoadingReviews,
      addReview
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
