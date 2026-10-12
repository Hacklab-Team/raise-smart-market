import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MoreVertical, 
  Star, 
  UserCheck, 
  UserMinus,
  ShoppingCart,
  Receipt,
  Sparkles
} from 'lucide-react';

export default function Customers() {
  const [search, setSearch] = useState('');

  const customers = [
    { id: '#CUST-001', name: 'Rohan Kumar', email: 'rohan.k@example.com', phone: '+91 98765 43210', visits: 24, spent: '₹14,450', status: 'Active', trolley: 'TRL-DEL-101' },
    { id: '#CUST-002', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91 98765 43213', visits: 56, spent: '₹48,900', status: 'VIP', trolley: 'TRL-DEL-105' },
    { id: '#CUST-003', name: 'Priya Singh', email: 'priya.s@example.com', phone: '+91 98765 43211', visits: 8, spent: '₹3,650', status: 'Active', trolley: 'TRL-DEL-102' },
    { id: '#CUST-004', name: 'Amit Sharma', email: 'amit.sh@example.com', phone: '+91 98765 43212', visits: 5, spent: '₹2,320', status: 'Active', trolley: 'TRL-DEL-103' },
    { id: '#CUST-005', name: 'Vikash Verma', email: 'vikash.v@example.com', phone: '+91 98765 43214', visits: 19, spent: '₹8,490', status: 'VIP', trolley: 'None' },
    { id: '#CUST-006', name: 'Ananya Roy', email: 'ananya.r@example.com', phone: '+91 98765 43215', visits: 31, spent: '₹21,100', status: 'Active', trolley: 'None' },
  ];

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Smart Shoppers CRM & Loyalty</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Registered customer profiles, shopping frequency, and autonomous trolley checkout histories.
          </p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all">
          Export Customer CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-4 border-l-4 border-l-blue-600">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Shoppers</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">8,523</p>
            <p className="text-[11px] text-emerald-600 font-bold">+12% this month</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-4 border-l-4 border-l-purple-600">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
            <Star size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">VIP Members</p>
            <p className="text-xl font-black text-purple-600 mt-0.5">452 Members</p>
            <p className="text-[11px] text-slate-400">Smart Cart priority perks</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-4 border-l-4 border-l-slate-400">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">In-Store Right Now</p>
            <p className="text-xl font-black text-slate-800 mt-0.5">4 Shoppers</p>
            <p className="text-[11px] text-blue-600 font-bold">Currently rolling carts</p>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        
        {/* Search */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-2.5 text-slate-400" size={17} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or email..." 
              className="w-full bg-white border border-slate-200 py-2 pl-10 pr-4 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <span className="text-xs text-slate-400 font-bold">{filtered.length} customers</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Shopper Info</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Active Cart</th>
                <th className="px-6 py-4 text-center">Store Visits</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs">{customer.name}</p>
                        <p className="text-[11px] font-mono text-slate-400">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5"><Phone size={12} className="text-slate-400"/> {customer.phone}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5"><Mail size={12} className="text-slate-400"/> {customer.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {customer.trolley !== 'None' ? (
                      <span className="font-mono text-xs font-black text-blue-600 px-2 py-0.5 bg-blue-50 rounded-lg">
                        {customer.trolley}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs font-medium">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{customer.visits}</td>
                  <td className="px-6 py-4 font-black text-slate-900">{customer.spent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {customer.status}
                    </span>
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