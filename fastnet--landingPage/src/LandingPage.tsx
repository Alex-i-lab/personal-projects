import { motion, useScroll, useTransform, AnimatePresence, animate, useInView, useMotionValue, useSpring } from 'motion/react';
import { 
  Wifi, 
  Shield, 
  Cloud, 
  Cpu, 
  Globe, 
  Phone, 
  Monitor, 
  Server, 
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  PhoneCall,
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
  Search,
  Loader2,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  LifeBuoy,
  Headphones,
  Clock,
  ExternalLink,
  Plus,
  Minus,
  RotateCcw,
  Activity,
  CreditCard,
  UserPlus,
  Bot,
  Send,
  Zap,
  LayoutGrid
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from './lib/utils';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GoogleGenAI } from "@google/genai";

// Fix Leaflet marker icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// --- Components ---

const Counter = ({ value, duration = 2, suffix = "", decimals = 0 }: { value: number, duration?: number, suffix?: string, decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = latest.toFixed(decimals) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const Navbar = ({ setView, onNavigate }: { setView: (view: 'landing' | 'topup') => void, onNavigate: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string, onClick?: () => void) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || searchOpen || supportOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, searchOpen, supportOpen]);

  const navLinks = [
    { name: 'Home', href: '#', onClick: () => setView('landing') },
    { name: 'About Us', href: '#about', onClick: () => setView('landing') },
    { name: 'Activities', href: '#services', onClick: () => setView('landing') },
    { name: 'Pricing', href: '#pricing', onClick: () => setView('landing') },
    { name: 'Testimonials', href: '#testimonials', onClick: () => setView('landing') },
    { name: 'Top Up', href: '#topup', onClick: () => setView('topup') },
    { name: 'Contact Us', href: '#contact', onClick: () => setView('landing') },
  ];

  const searchableItems = [
    { name: "3GB/Day Monthly", category: "Mobile", price: "65,000 RWF", href: "#pricing" },
    { name: "4GB/Day Monthly", category: "Mobile", price: "90,000 RWF", href: "#pricing" },
    { name: "Unlimited Mobile", category: "Unlimited", price: "16,000 RWF", href: "#pricing" },
    { name: "Unlimited 3 Mbps", category: "One Network", price: "96,000 RWF", href: "#pricing" },
    { name: "Unlimited 5 Mbps", category: "One Network", price: "120,000 RWF", href: "#pricing" },
    { name: "20Mbps Home Broadband", category: "Broadband", price: "20,000 RWF", href: "#pricing" },
    { name: "50Mbps Home Broadband", category: "Broadband", price: "35,000 RWF", href: "#pricing" },
    { name: "100GB Monthly", category: "Unlimited", price: "265,000 RWF", href: "#pricing" },
    { name: "200GB Monthly", category: "Unlimited", price: "480,000 RWF", href: "#pricing" },
    { name: "4G LTE Internet", category: "Service", href: "#services" },
    { name: "Fiber Connectivity", category: "Service", href: "#services" },
    { name: "ICT Infrastructure", category: "Service", href: "#services" },
    { name: "Managed Services", category: "Service", href: "#services" },
  ];

  const filteredItems = searchQuery.trim() === '' 
    ? [] 
    : searchableItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled || searchOpen || mobileMenuOpen ? "glass py-3 shadow-lg" : "bg-transparent"
      )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={(e) => onNavigate(e as any, '#', () => setView('landing'))}
        >
          <img 
            src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774434678/fastnet_logo_rh9qdm.png" 
            alt="FastNet Logo" 
            className="h-10 sm:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => onNavigate(e, link.href, link.onClick)}
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={() => setSearchOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button 
            onClick={() => setSupportOpen(true)}
            className="text-sm font-bold text-primary hover:text-secondary transition-colors"
          >
            Get Support
          </button>

          <button 
            onClick={() => {
              setView('landing');
              window.location.hash = 'pricing';
            }}
            className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setSearchOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={() => setSupportOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Support"
          >
            <LifeBuoy size={20} />
          </button>
          <button 
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[9999] flex flex-col"
          >
            <div className="px-6 py-4 border-b border-slate-100">
              <div className="max-w-7xl mx-auto flex items-center gap-4">
                <Search className="text-slate-400" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search for plans, services, or bundles..."
                  className="flex-1 bg-transparent border-none outline-none text-xl font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="max-w-3xl mx-auto">
                {searchQuery.trim() === '' ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 font-medium">Start typing to search for FastNet solutions...</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                      {['Unlimited', 'Fiber', 'Broadband', '4G LTE', 'Monthly'].map(tag => (
                        <button 
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-4 py-2 bg-slate-100 hover:bg-primary hover:text-white rounded-full text-sm font-bold transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                      Search Results ({filteredItems.length})
                    </p>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, idx) => (
                        <motion.a
                          key={item.name + idx}
                          href={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                        >
                          <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{item.category}</p>
                            <h5 className="font-bold text-slate-900">{item.name}</h5>
                            {item.price && <p className="text-sm text-slate-500 font-medium">{item.price}</p>}
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </motion.a>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-400 font-medium">No results found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#020617] z-[9999] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-3xl font-display font-bold text-white hover:text-primary transition-colors"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  onNavigate(e, link.href, link.onClick);
                }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              onClick={() => {
                setMobileMenuOpen(false);
                setSupportOpen(true);
              }}
              className="text-xl font-bold text-primary mt-4"
            >
              Get Support
            </motion.button>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navLinks.length + 1) * 0.1 }}
              onClick={() => {
                setMobileMenuOpen(false);
                setView('landing');
                window.location.hash = 'pricing';
              }}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-xl mt-4"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {supportOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSupportOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                    <LifeBuoy size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary">FastNet Support</h3>
                    <p className="text-sm text-slate-500 font-medium">How can we help you today?</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSupportOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
                >
                  <X />
                </button>
              </div>

              <div className="p-8 grid sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => {
                    setSupportOpen(false);
                    setView('topup');
                  }}
                  className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <h4 className="font-bold mb-1">Live Chat</h4>
                  <p className="text-sm text-slate-500 mb-4">Chat with our AI sales agent in real-time.</p>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    Start Chat <ChevronRight size={14} />
                  </span>
                </div>

                <a 
                  href="tel:+250788000000"
                  className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <Headphones size={20} />
                  </div>
                  <h4 className="font-bold mb-1">Phone Support</h4>
                  <p className="text-sm text-slate-500 mb-4">Call us directly for urgent technical issues.</p>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    +250 788 000 000 <ChevronRight size={14} />
                  </span>
                </a>

                <a 
                  href="mailto:support@fastnet.rw"
                  className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <h4 className="font-bold mb-1">Email Support</h4>
                  <p className="text-sm text-slate-500 mb-4">Send us a detailed request and we'll get back to you.</p>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    support@fastnet.rw <ChevronRight size={14} />
                  </span>
                </a>

                <div 
                  onClick={() => setSupportOpen(false)}
                  className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <ExternalLink size={20} />
                  </div>
                  <h4 className="font-bold mb-1">Knowledge Base</h4>
                  <p className="text-sm text-slate-500 mb-4">Find answers to common questions and guides.</p>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    Visit Help Center <ChevronRight size={14} />
                  </span>
                </div>
              </div>

              <div className="px-8 py-6 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={16} />
                  <span className="text-xs font-medium">Support available 24/7 for business clients</span>
                </div>
                <button className="text-xs font-bold text-secondary hover:underline">
                  View Status Page
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ setView }: { setView: (view: 'landing' | 'topup') => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { scrollY } = useScroll();
  
  // Mouse movement for antigravity effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -0.5 to 0.5
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleGetStarted = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('landing');
      window.location.hash = 'pricing';
    }, 1000);
  };

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);

  // Antigravity transforms
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]);
  const floatX = useTransform(smoothMouseX, [-0.5, 0.5], [-50, 50]);
  const floatY = useTransform(smoothMouseY, [-0.5, 0.5], [-50, 50]);
  const fastX = useTransform(smoothMouseX, [-0.5, 0.5], [-100, 100]);
  const fastY = useTransform(smoothMouseY, [-0.5, 0.5], [-100, 100]);

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-32 sm:pt-20 overflow-hidden bg-slate-50"
    >
      {/* Background 3D-like shapes with Parallax and Cursor Reaction */}
      <motion.div 
        style={{ y: y2, rotate, x: bgX, translateY: bgY }}
        className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-br from-primary/5 to-secondary/5 -skew-x-12 transform origin-top-right transition-all duration-100 ease-out" 
      />

      {/* Floating Antigravity Elements */}
      <motion.div 
        style={{ x: floatX, y: floatY }}
        className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-primary/5 blur-2xl pointer-events-none"
      />
      <motion.div 
        style={{ x: fastX, y: fastY }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-secondary/5 blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ x: bgY, y: bgX }} // Swapped for variety
        className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-primary/10 blur-xl pointer-events-none"
      />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6">
            <Wifi size={14} /> Rwanda's Premier ISP
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black leading-[0.95] sm:leading-[0.9] mb-6 tracking-tighter">
            WE ARE <br className="hidden xs:block sm:block" />
            <span className="text-primary">FAST</span>
            <span className="text-secondary">NET</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Experience the next generation of connectivity. High-speed 4G LTE, Fiber, and bespoke ICT solutions for your home and business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button 
              disabled={isLoading}
              onClick={handleGetStarted}
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Connecting...
                </>
              ) : (
                <>
                  Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <button 
              onClick={() => {
                setView('landing');
                window.location.hash = 'contact';
              }}
              className="w-full sm:w-auto bg-white border border-slate-200 px-8 py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-slate-50 transition-all"
            >
              Our Coverage
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center md:justify-start gap-4 sm:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl sm:text-2xl font-bold">
                500+
              </span>
              <span className="text-[10px] uppercase tracking-widest">Clients</span>
            </div>
            <div className="h-8 w-px bg-slate-300" />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl sm:text-2xl font-bold">
                <Counter value={99.9} suffix="%" decimals={1} />
              </span>
              <span className="text-[10px] uppercase tracking-widest">Uptime</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: y1, opacity }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774435655/bg2_wevdq6.jpg" 
              alt="FastNet Connectivity" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating 3D Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-20"
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary rounded-full blur-3xl opacity-20"
          />
          <div className="absolute top-1/2 -right-12 glass p-6 rounded-2xl shadow-xl z-20 max-w-[200px]">
             <Wifi className="text-secondary mb-2" size={32} />
             <p className="text-sm font-bold">Ultra-Fast 4G LTE</p>
             <p className="text-xs text-slate-500">Available across Rwanda</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-100 rounded-[40px] overflow-hidden relative group">
              <img 
                src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774435746/The_Future_Is_Here__AI_Web_Development_Business_Growth_jtu55c.jpg" 
                alt="About FastNet"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-primary text-white p-4 sm:p-8 rounded-3xl shadow-2xl max-w-[140px] sm:max-w-[240px]">
              <p className="text-2xl sm:text-4xl font-black mb-1 sm:mb-2">10+</p>
              <p className="text-[10px] sm:text-sm font-medium opacity-80 leading-tight">Years of excellence in ICT and Connectivity solutions.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">About FastNet</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Empowering Rwanda Through <span className="text-primary">Advanced Connectivity</span>
            </h3>
            <div className="space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                FastNet LTD is a registered ICT company in Rwanda, with a license to provide internet in Rwanda. We specialise in wireless communication LTE networks, fiber optic connection, it infrastructure and communication networks services.
              </p>
              <p>
                Our team has experience and great knowledge in the different services that we offer, and they are dynamic and committed to provide quality service and 99.99% up time internet availability.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start justify-center md:justify-start gap-3">
                <CheckCircle2 className="text-primary shrink-0" />
                <span className="font-semibold">Licensed ISP</span>
              </div>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <CheckCircle2 className="text-primary shrink-0" />
                <span className="font-semibold">99.99% Uptime</span>
              </div>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <CheckCircle2 className="text-primary shrink-0" />
                <span className="font-semibold">Expert Support</span>
              </div>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <CheckCircle2 className="text-primary shrink-0" />
                <span className="font-semibold">Fiber & LTE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Services",
      icon: <Wifi className="text-primary" size={32} />,
      hoverBg: "hover:bg-primary/5",
      description: "Our core connectivity services are designed to keep your business running at peak performance. We provide end-to-end solutions from initial infrastructure setup to ongoing maintenance and support.",
      items: ["Internet Service Provider", "ICT Infrastructure", "Fibre Networks", "Virtual Private Network", "Wireless Communication", "Voice Over IP", "IP CCTV", "IP TV"]
    },
    {
      title: "Solutions",
      icon: <Cloud className="text-secondary" size={32} />,
      hoverBg: "hover:bg-secondary/5",
      description: "We offer tailored IT solutions that address the unique challenges of your organization. From cloud migration to robust network security, our experts ensure your digital assets are protected and efficient.",
      items: ["Broadband", "Cloud Services", "IT advisory and Support", "Network Design & Implementation", "Network Security", "Data Solutions", "Backup and Recovery"]
    },
    {
      title: "Retail",
      icon: <Monitor className="text-accent" size={32} />,
      hoverBg: "hover:bg-accent/5",
      description: "Access high-quality telecommunication and networking hardware through our retail division. We source only the most reliable equipment to ensure long-term stability for your network infrastructure.",
      items: ["Telecommunication Equipment", "Network Devices", "Security Equipment"]
    }
  ];

  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">What We Do</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">Comprehensive ICT <span className="text-primary">Ecosystem</span></h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ 
                delay: idx * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              onClick={() => setSelectedService(service)}
              className={cn(
                "bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer",
                service.hoverBg
              )}
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-2xl font-display font-bold mb-6">{service.title}</h4>
              <ul className="space-y-4">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                Learn More <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="p-8 sm:p-12">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-8">
                  {selectedService.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-display font-bold mb-6">{selectedService.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {selectedService.description}
                </p>
                
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Offerings</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedService.items.map((item) => (
                      <div key={item} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                        <CheckCircle2 className="text-primary shrink-0" size={18} />
                        <span className="font-semibold text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-full mt-10 py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('mobile');
  const [customMbps, setCustomMbps] = useState(10);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    const topupSection = document.getElementById('topup');
    if (topupSection) {
      topupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculatePrice = (mbps: number) => {
    // Simple estimation logic based on existing broadband prices
    // 1Mbps ~ 125k, 5Mbps ~ 360k, 10Mbps ~ 650k (estimated)
    const basePrice = 50000;
    const pricePerMbps = mbps > 20 ? 45000 : mbps > 10 ? 55000 : 75000;
    return (basePrice + (mbps * pricePerMbps)).toLocaleString();
  };

  const plans = {
    mobile: [
      { name: "3GB/Day", price: "65,000", period: "Monthly" },
      { name: "4GB/Day", price: "90,000", period: "Monthly" },
      { name: "1GB/Day+", price: "26,000", period: "Monthly", category: "EDUCATION" },
      { name: "2GB/Day+", price: "37,000", period: "Monthly", category: "EDUCATION" },
      { name: "Unlimited Mobile", price: "16,000", period: "Monthly", category: "UNLIMITED FOR MOBILE" },
      { name: "Unlimited 3 Mbps", price: "96,000", period: "Monthly", category: "ONE NETWORK" },
      { name: "Unlimited 5 Mbps", price: "120,000", period: "Monthly", category: "ONE NETWORK" },
    ],
    agahebuzo: [
      { name: "3GB", price: "2,800", period: "Monthly" },
      { name: "5GB", price: "3,500", period: "Monthly" },
      { name: "10GB", price: "5,400", period: "Monthly" },
      { name: "20GB", price: "11,000", period: "Monthly" },
      { name: "30GB", price: "16,000", period: "Monthly" },
      { name: "50GB", price: "27,000", period: "Monthly" },
      { name: "100GB", price: "54,000", period: "Monthly" },
    ],
    broadband: [
      { name: "100GB", price: "265,000", period: "Monthly", category: "UNLIMITED" },
      { name: "200GB", price: "480,000", period: "Monthly", category: "UNLIMITED" },
      { name: "20Mbps", price: "20,000", period: "Monthly", category: "HOME BROADBAND" },
      { name: "50Mbps", price: "35,000", period: "Monthly", category: "HOME BROADBAND" },
    ],
    daily: [
      { name: "1GB/Day", price: "1,000", period: "Daily" },
      { name: "1GB/Week", price: "900", period: "Weekly" },
      { name: "3GB/Week", price: "1,900", period: "Weekly" },
      { name: "5GB/Week", price: "2,900", period: "Weekly" },
    ],
    social: [
      { name: "5GB/Week", price: "4,000", period: "Weekly", category: "ISANZURE SOCIAL PACKS" },
      { name: "10GB/Week", price: "6,500", period: "Weekly", category: "ISANZURE SOCIAL PACKS" },
    ]
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">Pricing Plans</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">4G Internet <span className="text-primary">Packages</span></h3>
          
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl max-w-full overflow-x-auto no-scrollbar">
            {['mobile', 'agahebuzo', 'broadband', 'daily', 'social', 'custom'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                  activeTab === tab ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab === 'custom' ? 'Plan Estimator' : tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'custom' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-slate-50 p-8 sm:p-12 rounded-[40px] border border-slate-200"
          >
            <div className="text-center mb-12">
              <h4 className="text-2xl font-display font-bold mb-2">Build Your Custom Fiber Plan</h4>
              <p className="text-slate-500">Adjust the bandwidth to see an estimated monthly cost for your business.</p>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Bandwidth (Mbps)</label>
                  <span className="text-5xl font-black text-primary">{customMbps}<span className="text-xl font-bold text-slate-400 ml-1">Mbps</span></span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  step="1"
                  value={customMbps}
                  onChange={(e) => setCustomMbps(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  <span>1 Mbps</span>
                  <span>50 Mbps</span>
                  <span>100 Mbps</span>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Monthly Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-slate-500">RWF</span>
                    <span className="text-5xl font-black text-secondary">{calculatePrice(customMbps)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleRequestQuote}
                  className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Request Quote <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans[activeTab as keyof typeof plans].map((plan, idx) => (
              <motion.div
                key={plan.name + idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group p-8 rounded-[32px] border border-slate-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform" />
                {plan.category && (
                  <p className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-4 tracking-[0.2em]">
                    {plan.category}
                  </p>
                )}
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{plan.period}</p>
                <h4 className="text-xl font-bold mb-6">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-sm font-bold text-slate-500">RWF</span>
                  <span className="text-4xl font-black text-primary">{plan.price}</span>
                </div>
                <button 
                  onClick={handleSubscribe}
                  className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-bold hover:bg-primary hover:text-white transition-all"
                >
                  Subscribe Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
        
        <p className="mt-12 text-center text-slate-400 text-sm max-w-2xl mx-auto">
          The above internet packages and prices are subject to change given the need presented by the Client, and discount agreed by KTRN our wholesale partner.
        </p>
      </motion.div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jean-Claude Habimana",
      role: "Business Owner",
      quote: "FastNet has completely transformed our office operations. The fiber connection is incredibly stable and the support team is always responsive.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Marie Claire Uwase",
      role: "Freelance Designer",
      quote: "As a remote worker, reliable internet is my lifeline. FastNet's 4G LTE gives me the freedom to work from anywhere in Kigali with zero lag.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "David Nkurunziza",
      role: "IT Manager",
      quote: "We've tried several ISPs in Rwanda, but FastNet stands out for their technical expertise and consistent 99.9% uptime. Highly recommended for enterprise needs.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">What Our <span className="text-primary">Clients Say</span></h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[450px] sm:min-h-[350px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white p-8 sm:p-12 rounded-[40px] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-4 border-primary/10">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center md:text-left">
                  <Quote className="text-primary/20 mb-4 mx-auto md:mx-0" size={48} />
                  <p className="text-lg sm:text-xl text-slate-600 italic mb-6 leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm font-medium text-primary uppercase tracking-widest">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev}
              className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const RecenterButton = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    // Fix for Leaflet tiles not loading correctly in some containers
    // We use ResizeObserver to handle any container size changes (including animations)
    const container = map.getContainer();
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    
    observer.observe(container);

    // Also call it multiple times as a fallback
    const intervals = [100, 500, 1000, 2000];
    const timers = intervals.map(delay => setTimeout(() => map.invalidateSize(), delay));
    
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [map]);

  return (
    <button 
      onClick={() => {
        map.setView(center, 9);
        map.invalidateSize();
      }}
      className="absolute bottom-20 right-6 z-[1000] w-10 h-10 bg-white/10 hover:bg-primary backdrop-blur-md rounded-xl flex items-center justify-center text-white transition-all border border-white/10"
      title="Recenter Map"
    >
      <RotateCcw size={18} />
    </button>
  );
};

const RwandaMap = () => {
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [mapKey, setMapKey] = useState(0);
  const mapCenter: [number, number] = [-1.9441, 30.0619];

  useEffect(() => {
    // Force a re-render after mount to ensure Leaflet has correct container dimensions
    const timer = setTimeout(() => setMapKey(1), 100);
    return () => clearTimeout(timer);
  }, []);

  // Major cities/coverage hubs
  const coveragePoints = [
    { id: 1, name: "Kigali", coords: [-1.9441, 30.0619], type: "Main Data Center", status: "Online", speed: "10 Gbps", latency: "2ms" },
    { id: 2, name: "Musanze", coords: [-1.5041, 29.6350], type: "Regional Hub", status: "Online", speed: "1 Gbps", latency: "8ms" },
    { id: 3, name: "Rubavu", coords: [-1.6917, 29.2611], type: "Fiber Node", status: "Online", speed: "1 Gbps", latency: "12ms" },
    { id: 4, name: "Huye", coords: [-2.5167, 29.7417], type: "Regional Hub", status: "Online", speed: "1 Gbps", latency: "10ms" },
    { id: 5, name: "Rusizi", coords: [-2.4833, 28.9000], type: "Fiber Node", status: "Online", speed: "500 Mbps", latency: "15ms" },
    { id: 6, name: "Kayonza", coords: [-1.9333, 30.5167], type: "Regional Hub", status: "Online", speed: "1 Gbps", latency: "9ms" },
    { id: 7, name: "Nyagatare", coords: [-1.3000, 30.3333], type: "Fiber Node", status: "Online", speed: "500 Mbps", latency: "14ms" },
  ];

  // Network backbone connections (from Kigali to others)
  const connections = [
    [1, 2], [1, 4], [1, 6], [2, 3], [4, 5], [6, 7]
  ];

  return (
    <div className="w-full h-full relative bg-slate-950 overflow-hidden rounded-3xl border border-white/10">
      <MapContainer 
        key={mapKey}
        center={mapCenter} 
        zoom={9} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        className="z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <RecenterButton center={mapCenter} />
        
        {/* Network Connections */}
        {connections.map(([startId, endId], idx) => {
          const start = coveragePoints.find(p => p.id === startId);
          const end = coveragePoints.find(p => p.id === endId);
          if (start && end) {
            return (
              <Polyline
                key={`conn-${idx}`}
                positions={[start.coords as [number, number], end.coords as [number, number]]}
                pathOptions={{
                  color: '#3b82f6',
                  weight: 2,
                  dashArray: '5, 10',
                  opacity: 0.4
                }}
              />
            );
          }
          return null;
        })}

        {/* Coverage Nodes */}
        {coveragePoints.map((point) => (
          <React.Fragment key={point.id}>
            {/* Pulse Effect */}
            <CircleMarker
              center={point.coords as [number, number]}
              pathOptions={{
                fillColor: '#3b82f6',
                fillOpacity: 0.4,
                color: 'transparent',
                className: 'leaflet-marker-pulse'
              }}
              radius={12}
            />
            
            <CircleMarker
              center={point.coords as [number, number]}
              pathOptions={{
                fillColor: point.id === 1 ? '#ef4444' : '#3b82f6',
                fillOpacity: 1,
                color: 'white',
                weight: 2
              }}
              radius={6}
              eventHandlers={{
                mouseover: () => setHoveredNode(point),
                mouseout: () => setHoveredNode(null),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-3 min-w-[180px] bg-slate-900 text-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{point.type}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-green-500 uppercase">{point.status}</span>
                    </div>
                  </div>
                  <h5 className="font-bold text-base mb-3 text-white">{point.name}</h5>
                  <div className="grid grid-cols-2 gap-3 border-t pt-3 border-white/10">
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Throughput</p>
                      <p className="text-xs font-bold text-white">{point.speed}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Latency</p>
                      <p className="text-xs font-bold text-white">{point.latency}</p>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          </React.Fragment>
        ))}
      </MapContainer>
      
      {/* Overlay UI */}
      <div className="absolute top-6 left-6 pointer-events-none z-[1000]">
        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
          <h4 className="text-white font-display font-bold text-lg flex items-center gap-2">
            <Activity size={18} className="text-primary animate-pulse" />
            Network Backbone
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Real-time Coverage Status</p>
        </div>
      </div>

      {/* Tooltip (Custom Overlay) */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-6 right-6 z-[1000] pointer-events-none"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{hoveredNode.type}</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-green-500 uppercase">{hoveredNode.status}</span>
                </div>
              </div>
              <h5 className="text-white font-bold text-xl mb-3">{hoveredNode.name}</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Throughput</p>
                  <p className="text-sm font-bold text-white">{hoveredNode.speed}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Latency</p>
                  <p className="text-sm font-bold text-white">{hoveredNode.latency}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 bg-primary/20 border border-primary/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest pointer-events-none z-[1000]">
        Live Network Map
      </div>
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accents with Parallax */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <motion.div 
          style={{ y: y1, scale }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2, scale }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">Connect With Us</h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-12 leading-tight">
              Ready to Get <span className="text-primary">Connected?</span>
            </h3>
            
            <div className="space-y-6 sm:space-y-8 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Our Office</p>
                  <p className="text-base sm:text-lg">KN 5 Ave, 1st Floor Kisimenti Building, Remera, Gasabo, Kigali</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <PhoneCall className="text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-base sm:text-lg">+250 788 222 333</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-base sm:text-lg">info@fastnet.rw</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border border-white/10">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-slate-400">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-primary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm sm:text-base" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm sm:text-base" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                    <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm sm:text-base" placeholder="How can we help you?" />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 sm:py-5 rounded-2xl bg-primary text-white font-bold text-base sm:text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Interactive Rwanda Map */}
            <div className="h-80 sm:h-96 bg-slate-800 rounded-[40px] overflow-hidden border border-white/10 relative group">
              <RwandaMap />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setView, onNavigate }: { setView: (view: 'landing' | 'topup') => void, onNavigate: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string, onClick?: () => void) => void }) => {
  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => onNavigate(e as any, '#', () => setView('landing'))}
          >
            <img 
              src="https://res.cloudinary.com/dcy26s9jm/image/upload/v1774434678/fastnet_logo_rh9qdm.png" 
              alt="FastNet Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" onClick={(e) => onNavigate(e, '#', () => setView('landing'))} className="text-sm text-slate-400 hover:text-white transition-colors">Home</a>
            <a href="#about" onClick={(e) => onNavigate(e, '#about', () => setView('landing'))} className="text-sm text-slate-400 hover:text-white transition-colors">About</a>
            <a href="#services" onClick={(e) => onNavigate(e, '#services', () => setView('landing'))} className="text-sm text-slate-400 hover:text-white transition-colors">Services</a>
            <a href="#pricing" onClick={(e) => onNavigate(e, '#pricing', () => setView('landing'))} className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
            <a href="#contact" onClick={(e) => onNavigate(e, '#contact', () => setView('landing'))} className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
        
        <div className="w-full h-px bg-white/5" />
        
        <p className="text-slate-500 text-sm text-center">
          Copyright © 2026 All rights reserved | FastNet ISP Rwanda
        </p>
      </motion.div>
    </footer>
  );
};

const TopUpPage = ({ setView }: { setView: (view: 'landing' | 'topup') => void }) => {
  const [subNumber, setSubNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isToppingUp, setIsToppingUp] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm your FastNet AI Assistant. Are you looking to sign up for our high-speed internet services? I can help you choose the best plan for your needs!" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subNumber || !amount) return;
    
    setIsToppingUp(true);
    setTimeout(() => {
      setIsToppingUp(false);
      setTopUpSuccess(true);
      setSubNumber('');
      setAmount('');
      setTimeout(() => setTopUpSuccess(false), 5000);
    }, 2000);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setUserInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `You are a helpful sales agent for FastNet Rwanda, an ISP. A potential client is asking: "${userMsg}". Help them choose a plan (Mobile, Home Broadband, or Business Fiber) and guide them through the signup process. Be professional, friendly, and concise. Mention that we offer 99.9% uptime and high speeds.` }] }
        ],
      });
      
      const botResponse = response.text || "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team.";
      setChatMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages(prev => [...prev, { role: 'bot', text: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="topup" className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">FastNet Portal</h2>
          <h3 className="text-4xl sm:text-5xl font-display font-bold mb-6">Manage Your <span className="text-secondary">Connectivity</span></h3>
          <p className="text-slate-600 max-w-2xl mx-auto">Top up your existing subscription or talk to our AI agent to join the FastNet family today.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top Up Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 sm:p-12 rounded-[40px] shadow-xl border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <CreditCard size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-secondary">Quick Top Up</h4>
                <p className="text-sm text-slate-500">Recharge your account instantly</p>
              </div>
            </div>

            <form onSubmit={handleTopUp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Subscription Number</label>
                <div className="relative">
                  <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    value={subNumber}
                    onChange={(e) => setSubNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 focus:outline-none focus:border-primary transition-colors" 
                    placeholder="e.g. FN-123456" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Amount (RWF)</label>
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-4 focus:outline-none focus:border-primary transition-colors" 
                    placeholder="Enter amount" 
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isToppingUp}
                className="w-full py-5 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isToppingUp ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                {isToppingUp ? 'Processing...' : 'Top Up Now'}
              </button>

              {topUpSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-600 text-center font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Top up successful! Your account is now active.
                </motion.div>
              )}
            </form>

            <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h5 className="font-bold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-secondary" />
                Secure Payments
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                We support all major payment methods in Rwanda including MTN Mobile Money, Airtel Money, and local bank transfers. Your transaction is encrypted and secure.
              </p>
            </div>
          </motion.div>

          {/* AI Agent Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 p-8 sm:p-12 rounded-[40px] shadow-2xl border border-white/10 flex flex-col h-[600px] lg:h-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <Bot size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">New Client?</h4>
                <p className="text-sm text-slate-400">Talk to our AI Sales Agent</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm",
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white/10 text-slate-200 border border-white/10 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-slate-200 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="relative">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about our plans or how to sign up..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => setView('landing')}
            className="text-slate-500 hover:text-primary font-bold flex items-center gap-2 mx-auto transition-colors"
          >
            <ChevronLeft size={20} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'topup'>('landing');
  const [targetHash, setTargetHash] = useState<string | null>(null);

  useEffect(() => {
    if (targetHash) {
      const targetId = targetHash.replace('#', '');
      if (targetId) {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setTargetHash(null);
    }
  }, [view, targetHash]);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string, onClick?: () => void) => {
    e.preventDefault();
    if (onClick) onClick();
    setTargetHash(href);
  };

  return (
    <div className="font-sans">
      <Navbar setView={setView} onNavigate={handleNavigate} />
      {view === 'landing' ? (
        <>
          <Hero setView={setView} />
          <About />
          <Services />
          <Pricing />
          <Testimonials />
          <Contact />
        </>
      ) : (
        <TopUpPage setView={setView} />
      )}
      <Footer setView={setView} onNavigate={handleNavigate} />
    </div>
  );
}
