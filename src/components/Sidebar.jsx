import React from 'react';
import { LayoutDashboard, ShoppingCart, Users, Package, PieChart, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { name: 'Overview', icon: LayoutDashboard, id: 'dashboard' },
    { name: 'Customers', icon: Users, id: 'customers' },
    { name: 'Orders', icon: ShoppingCart, id: 'orders' },
    { name: 'Products', icon: Package, id: 'products' },
    { name: 'Analytics', icon: PieChart, id: 'analytics' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-black text-blue-500 tracking-tight">RAISE</h1>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Smart Market</p>
      </div>
      
      <nav className="flex-1 mt-6">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
              activeTab === item.id 
                ? 'bg-slate-800/50 border-l-4 border-blue-500 text-blue-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-semibold text-sm">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button className="w-full flex items-center gap-4 px-2 py-2 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-semibold text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}