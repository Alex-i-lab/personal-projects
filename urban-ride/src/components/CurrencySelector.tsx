import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useCurrency } from '../context/CurrencyContext';

const currencies = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'RWF', label: 'Rwandan Franc', symbol: 'FRW' },
] as const;

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-xl shadow-black/10 border border-black/5 p-2 min-w-[140px] flex flex-col gap-1"
          >
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code as any);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors",
                  currency === curr.code
                    ? "bg-black text-white"
                    : "hover:bg-black/5 text-black/70"
                )}
              >
                <span className="font-bold w-6 text-center">{curr.symbol}</span>
                <span className="text-sm font-medium">{curr.code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-black shadow-lg border border-black/5 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
        aria-label="Select Currency"
      >
        {isOpen ? <X size={20} /> : <Globe size={20} />}
      </button>
    </div>
  );
};
