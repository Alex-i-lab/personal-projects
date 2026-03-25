import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { User, ShoppingBag, LogOut, ChevronRight, Package, Clock, CheckCircle, Truck, XCircle, MapPin, Mail, Calendar } from "lucide-react";
import { useAppContext } from '../context/AppContext';
import { getUserOrders } from '../lib/firebase';

const Account: React.FC = () => {
  const { isAuthReady, formatPrice, currency } = useAppContext();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  useEffect(() => {
    // Fetching orders for guest is disabled or could be done via email
    setOrders([]);
  }, []);

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen removed

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} className="text-amber-500" />;
      case 'processing': return <Package size={16} className="text-blue-500" />;
      case 'shipped': return <Truck size={16} className="text-indigo-500" />;
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-[#F5F5F5] flex items-center justify-center border-4 border-white shadow-sm">
                    <User size={40} className="text-gray-300" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-serif">Guest User</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Guest Account</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-6 border-t border-[#F5F5F5]">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm uppercase tracking-widest ${activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-[#F5F5F5] text-gray-500'}`}
                >
                  <User size={18} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm uppercase tracking-widest ${activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-[#F5F5F5] text-gray-500'}`}
                >
                  <ShoppingBag size={18} />
                  Orders
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm space-y-12"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl font-serif">Profile Details</h1>
                  <p className="text-gray-400">Manage your personal information and preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Full Name</label>
                    <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-2xl">
                      <User size={18} className="text-gray-400" />
                      <span className="text-sm font-medium">Guest</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Email Address</label>
                    <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-2xl">
                      <Mail size={18} className="text-gray-400" />
                      <span className="text-sm font-medium">Guest</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Member Since</label>
                    <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-2xl">
                      <Calendar size={18} className="text-gray-400" />
                      <span className="text-sm font-medium">
                        N/A
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAAAAA]">Default Currency</label>
                    <div className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-2xl">
                      <span className="text-sm font-bold">{currency.code}</span>
                      <span className="text-sm font-medium">{currency.label} ({currency.symbol})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#F5F5F5]">
                  <div className="bg-gold/5 p-6 rounded-2xl flex items-start gap-4 border border-gold/10">
                    <MapPin size={24} className="text-gold mt-1" />
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg">Shipping Addresses</h4>
                      <p className="text-sm text-gray-500">You haven't added any shipping addresses yet. Add one during checkout to save it here.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-serif">Order History</h1>
                    <p className="text-gray-400">Track and manage your recent purchases.</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{orders.length} Orders</span>
                </div>

                {isLoadingOrders ? (
                  <div className="bg-white p-20 rounded-3xl shadow-sm flex flex-col items-center justify-center space-y-4">
                    <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Loading your orders...</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-transparent hover:border-gold/20 transition-all group">
                        <div className="p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 border-b border-[#F5F5F5]">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center">
                              <Package size={24} className="text-gray-400" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order ID</p>
                              <p className="font-mono text-sm">#{order.orderId.slice(0, 8).toUpperCase()}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Date</p>
                            <p className="text-sm font-medium">
                              {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total</p>
                            <p className="text-sm font-bold text-gold">{formatPrice(order.total)}</p>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] rounded-full">
                            {getStatusIcon(order.status)}
                            <span className="text-[10px] uppercase tracking-widest font-bold">{order.status}</span>
                          </div>
                        </div>
                        <div className="p-6 sm:p-8 bg-[#FAFAFA]/50">
                          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex-shrink-0 w-20 space-y-2">
                                <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-sm">
                                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[9px] uppercase tracking-widest text-center font-bold truncate">{item.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-20 rounded-3xl shadow-sm text-center space-y-6">
                    <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag size={40} className="text-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif">No orders yet</h3>
                      <p className="text-gray-500 max-w-xs mx-auto">Your collection is waiting. Start shopping to see your orders here.</p>
                    </div>
                    <button className="px-8 py-3 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all shadow-xl">
                      Start Shopping
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
