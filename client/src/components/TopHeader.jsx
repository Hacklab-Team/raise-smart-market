import React from 'react';
import { Search, Bell, Moon } from 'lucide-react';

export default function TopHeader() {
  return (
    <header className="bg-white h-20 px-8 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.05)] sticky top-0 z-40">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-slate-800">Welcome, Akshay</h2>
      </div>
      
      <div className="flex-1 max-w-2xl mx-8 relative">
        <Search className="absolute left-4 top-3 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search orders, customers, or products..."
          className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-12 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Moon size={20} />
        </button>
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            AS
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-800">Akshay Sh.</p>
            <p className="text-[11px] font-medium text-slate-500">Business Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}