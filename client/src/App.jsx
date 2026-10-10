import React, { useState } from 'react';
import { ShoppingCart, AlertCircle, CheckCircle2, TrendingUp, Package, ShieldCheck } from 'lucide-react';

export default function App() {
  const [trolleys] = useState([
    { id: 'TRL-DEL-101', status: 'verified', items: 12, total: 450.50, lastItem: 'Tata Tea Gold 500g' },
    { id: 'TRL-DEL-102', status: 'mismatch', items: 3, total: 120.00, lastItem: 'Cadbury Silk 150g (Weight Mismatch)' },
    { id: 'TRL-DEL-103', status: 'verified', items: 8, total: 340.00, lastItem: 'Lays Classic 50g' },
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            RAISE <span className="text-slate-800">Smart Market</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Live Store Operating System</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          System Online
        </div>
      </header>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-slate-500 text-sm font-bold mb-1">Today's Revenue</p>
            <h2 className="text-3xl font-black">₹12,450</h2>
          </div>
          <div className="bg-blue-100 p-4 rounded-full text-blue-600"><TrendingUp size={28}/></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-slate-500 text-sm font-bold mb-1">Active Trolleys</p>
            <h2 className="text-3xl font-black">24</h2>
          </div>
          <div className="bg-purple-100 p-4 rounded-full text-purple-600"><ShoppingCart size={28}/></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-slate-500 text-sm font-bold mb-1">Security Status</p>
            <h2 className="text-2xl font-black text-red-500">1 Alert</h2>
          </div>
          <div className="bg-red-100 p-4 rounded-full text-red-600"><ShieldCheck size={28}/></div>
        </div>
      </div>

      {/* Live Fleet Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" /> Live Trolley Fleet
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-400 text-sm border-b border-slate-100">
                <th className="p-4 font-semibold">Trolley ID</th>
                <th className="p-4 font-semibold">Latest Item Scanned</th>
                <th className="p-4 font-semibold">Cart Total</th>
                <th className="p-4 font-semibold">Security Status</th>
              </tr>
            </thead>
            <tbody>
              {trolleys.map((t) => (
                <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-blue-700">{t.id}</td>
                  <td className="p-4 text-slate-600 font-medium">{t.lastItem}</td>
                  <td className="p-4 font-bold">₹{t.total.toFixed(2)}</td>
                  <td className="p-4">
                    {t.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                        <CheckCircle2 size={14} /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold animate-pulse">
                        <AlertCircle size={14} /> Weight Mismatch
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}