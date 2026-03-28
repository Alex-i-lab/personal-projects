import React, { createContext, useContext, useState, useMemo } from 'react';

type Currency = 'USD' | 'EUR' | 'RWF';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  RWF: 1350,
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = useMemo(() => {
    return (usdPrice: number) => {
      const convertedPrice = usdPrice * EXCHANGE_RATES[currency];
      
      // RWF typically does not display decimal places
      const maxFractions = currency === 'RWF' ? 0 : 2;
      const minFractions = currency === 'RWF' ? 0 : 2;

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: maxFractions,
        minimumFractionDigits: minFractions,
      }).format(convertedPrice).replace('RWF', 'FRW'); // In case Intl outputs "RWF", "FRW" is cleaner sometimes, but native Intl handles RWF usually. We can just append ' / day'
      
      return `${formatted} / day`;
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
