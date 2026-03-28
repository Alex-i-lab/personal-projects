import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Fleet } from './components/Fleet';
import { Testimonials } from './components/Testimonials';
import { Cities } from './components/Cities';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Fleet />
        <Testimonials />
        <Cities />
      </main>
      <Footer />
    </div>
  );
}

