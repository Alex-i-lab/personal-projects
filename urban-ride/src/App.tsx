import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { CarBrands } from './components/CarBrands';
import { Fleet } from './components/Fleet';
import { Testimonials } from './components/Testimonials';
import { Cities } from './components/Cities';
import { Footer } from './components/Footer';
import { CurrencyProvider } from './context/CurrencyContext';
import { CurrencySelector } from './components/CurrencySelector';

export default function App() {
  return (
    <CurrencyProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <CarBrands />
          <Fleet />
          <Testimonials />
          <Cities />
        </main>
        <Footer />
        <CurrencySelector />
      </div>
    </CurrencyProvider>
  );
}

