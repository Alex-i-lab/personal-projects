import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white text-black pt-32 pb-16 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-32">
          <div className="col-span-2 lg:col-span-2 space-y-8">
            <a href="/" className="text-2xl font-display font-bold tracking-tight">
              URBAN <span className="font-light">RIDE</span>
            </a>
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-30">Subscribe to the newsletter</p>
              <div className="relative max-w-sm">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-muted border-none rounded-2xl py-4 px-6 text-sm focus:ring-1 focus:ring-black/10 transition-all placeholder:text-black/20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-30 mb-8">Network</h4>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><a href="#" className="hover:opacity-50 transition-opacity">Kigali</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Rubavu</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Musanze</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Butare</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-30 mb-8">Services</h4>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><a href="#" className="hover:opacity-50 transition-opacity">Corporate</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Airport</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Events</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Private</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-30 mb-8">Company</h4>
            <ul className="space-y-4 text-[14px] font-medium">
              <li><a href="#" className="hover:opacity-50 transition-opacity">About</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Careers</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Legal</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[11px] font-medium opacity-30 tracking-wide">
            © 2026 URBAN RIDE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-50 transition-opacity"><Facebook size={18} /></a>
            <a href="#" className="hover:opacity-50 transition-opacity"><Twitter size={18} /></a>
            <a href="#" className="hover:opacity-50 transition-opacity"><Instagram size={18} /></a>
            <a href="#" className="hover:opacity-50 transition-opacity"><Youtube size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
