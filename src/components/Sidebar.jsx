import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  PieChart, 
  Settings, 
  Database, 
  Smartphone, 
  Radio, 
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { mismatchCount, activeTrolleysCount, isStoreOnline, supabaseConnected } = useStore();

  const menu = [
    { name: 'Store Overview', icon: LayoutDashboard, id: 'dashboard', badge: null },
    { 
      name: 'Trolley IoT Fleet', 
      icon: ShoppingCart, 
      id: 'trolleys', 
      badge: mismatchCount > 0 ? `${mismatchCount} Alert` : `${activeTrolleysCount} Active`,
      badgeColor: mismatchCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500/20 text-blue-400'
    },
    { 
      name: 'Client Dashboard', 
      icon: Smartphone, 
      id: 'client', 
      badge: 'Live Carts',
      badgeColor: 'bg-emerald-500/20 text-emerald-400'
    },
    { name: 'Products & Weights', icon: Package, id: 'products', badge: null },
    { name: 'Live Orders', icon: Radio, id: 'orders', badge: 'Realtime', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { name: 'Customers CRM', icon: Users, id: 'customers', badge: null },
    { name: 'Analytics & Theft ROI', icon: PieChart, id: 'analytics', badge: null },
    { 
      name: 'Supabase Hub', 
      icon: Database, 
      id: 'supabase', 
      badge: supabaseConnected ? 'Live' : 'Config',
      badgeColor: supabaseConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
    },
    { name: 'Store Settings', icon: Settings, id: 'settings', badge: null },
  ];

  return (
    <aside className="w-72 bg-[#0b0f19] text-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800/80 shadow-2xl z-50 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/70 bg-gradient-to-b from-slate-900 to-[#0b0f19]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
            <ShoppingCart className="text-white h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                RAISE
              </h1>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                IoT OS
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Smart Market Fleet</p>
          </div>
        </div>

        {/* Live Store Pill */}
        <div className="mt-4 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isStoreOnline ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`}></span>
            <span className="text-xs font-semibold text-slate-300">
              {isStoreOnline ? 'Market Online (Open)' : 'Market Offline'}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-500">v2.4 IoT</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Core Operating System
        </div>
        {menu.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={19} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400 transition-colors'} />
                <span className="text-sm tracking-tight">{item.name}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="text-blue-200" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Supabase Quick Connection Status */}
      <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Database size={15} className={supabaseConnected ? 'text-emerald-400' : 'text-amber-400'} />
            <span className="text-xs font-bold text-slate-300">Supabase DB</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            supabaseConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {supabaseConnected ? 'Synced' : 'Ready'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          {supabaseConnected ? 'Realtime sync active with IoT Trolleys & Client app' : 'Connect "suba biz" URL & key to sync multi-devices'}
        </p>
        <button 
          onClick={() => setActiveTab('supabase')}
          className="mt-2.5 w-full text-xs font-bold py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          Manage Connection <ChevronRight size={12} />
        </button>
      </div>

      {/* Footer User Profile */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
            AS
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">Akshay Sharma</p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Super Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}