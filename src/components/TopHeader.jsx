import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Clock, 
  Store, 
  ShieldAlert, 
  ShieldCheck, 
  Database, 
  Check, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function TopHeader({ activeTab, setActiveTab }) {
  const { 
    isStoreOnline, 
    setIsStoreOnline, 
    mismatchCount, 
    activeTrolleysCount, 
    notifications, 
    markAllNotificationsRead,
    supabaseConnected,
    products,
    trolleys,
    setSelectedTrolleyId
  } = useStore();

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Filtered search results
  const filteredProducts = searchQuery ? products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.barcode.includes(searchQuery)
  ).slice(0, 4) : [];

  const filteredTrolleys = searchQuery ? trolleys.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (t.customer?.name && t.customer.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 3) : [];

  return (
    <header className="bg-white/95 backdrop-blur-md h-20 px-8 flex items-center justify-between border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      
      {/* Left: View title & Live Clock */}
      <div className="flex items-center gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight capitalize">
              {activeTab === 'trolleys' ? 'Smart Trolley IoT Fleet' :
               activeTab === 'client' ? 'Client / Shopper Live Cart' :
               activeTab === 'supabase' ? 'Supabase Backend Hub' :
               activeTab}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-bold text-slate-500">
              Admin OS
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-0.5">
            <Clock size={12} className="text-slate-400" />
            <span className="font-mono text-slate-600">{time}</span>
            <span>•</span>
            <span>New Delhi Store #01</span>
          </div>
        </div>

        {/* Store Open/Closed Toggle */}
        <button
          onClick={() => setIsStoreOnline(!isStoreOnline)}
          className={`hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
            isStoreOnline 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isStoreOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
          {isStoreOnline ? 'Store Live & Accepting Carts' : 'Store Offline (Paused)'}
        </button>
      </div>

      {/* Middle: Universal Search Bar */}
      <div className="flex-1 max-w-xl mx-8 relative">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={17} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchModal(true)}
            placeholder="Search products, trolley IDs, barcode, customers..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 py-2 pl-10 pr-12 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-2.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>

        {/* Search Results Dropdown */}
        {showSearchModal && searchQuery && (
          <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 bg-slate-50/80 border-b border-slate-100 flex justify-between items-center text-xs font-bold text-slate-500">
              <span>Quick Results for "{searchQuery}"</span>
              <button onClick={() => { setSearchQuery(''); setShowSearchModal(false); }} className="hover:text-slate-800">
                <X size={14} />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto p-2 space-y-2">
              {filteredTrolleys.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">Trolleys</div>
                  {filteredTrolleys.map(t => (
                    <div 
                      key={t.id} 
                      onClick={() => {
                        setSelectedTrolleyId(t.id);
                        setActiveTab('trolleys');
                        setShowSearchModal(false);
                      }}
                      className="p-2 hover:bg-blue-50/60 rounded-xl cursor-pointer flex justify-between items-center text-xs"
                    >
                      <div className="font-bold text-blue-600">{t.id} <span className="text-slate-600 font-normal">({t.customer?.name || 'Idle'})</span></div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.status === 'mismatch' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {filteredProducts.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">Products</div>
                  {filteredProducts.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setActiveTab('products');
                        setShowSearchModal(false);
                      }}
                      className="p-2 hover:bg-slate-50 rounded-xl cursor-pointer flex justify-between items-center text-xs"
                    >
                      <div>
                        <span className="mr-2">{p.image}</span>
                        <span className="font-bold text-slate-800">{p.name}</span>
                        <span className="text-slate-400 font-mono text-[11px] ml-2">{p.barcode}</span>
                      </div>
                      <span className="font-black text-slate-800">₹{p.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {filteredTrolleys.length === 0 && filteredProducts.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400">
                  No products or trolleys found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* Security Alert Badge Pill */}
        {mismatchCount > 0 ? (
          <div 
            onClick={() => setActiveTab('trolleys')}
            className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 border border-red-200 animate-pulse hover:bg-red-200 transition-colors"
          >
            <ShieldAlert size={16} />
            <span className="text-xs font-black">{mismatchCount} Weight Mismatch!</span>
          </div>
        ) : (
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold">
            <ShieldCheck size={15} />
            <span>Anti-Theft Verified</span>
          </div>
        )}

        {/* Supabase Status Pill */}
        <button
          onClick={() => setActiveTab('supabase')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
            supabaseConnected
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
          }`}
          title="Supabase Backend Setup"
        >
          <Database size={14} className={supabaseConnected ? 'text-emerald-600' : 'text-amber-600'} />
          <span className="hidden sm:inline">Supabase:</span>
          <span>{supabaseConnected ? 'Connected' : 'Setup DB'}</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-extrabold text-slate-800">Live IoT Notifications</span>
                <button 
                  onClick={markAllNotificationsRead}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  Mark all read
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                {notifications.map(n => (
                  <div key={n.id} className={`py-3 ${n.read ? 'opacity-60' : ''}`}>
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-xs font-black text-slate-800">{n.title}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar */}
        <div 
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2.5 pl-3 border-l border-slate-200 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-md group-hover:ring-2 group-hover:ring-blue-400 transition-all">
            AS
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-extrabold text-slate-800 leading-tight">Akshay</p>
            <p className="text-[10px] font-bold text-slate-400">Store Manager</p>
          </div>
        </div>

      </div>

    </header>
  );
}