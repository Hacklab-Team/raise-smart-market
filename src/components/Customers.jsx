import React from 'react';
import { Search, Filter, Mail, Phone, MoreVertical, Star, UserCheck, UserMinus } from 'lucide-react';

export default function Customers() {
  // डमी कस्टमर्स डेटा
  const customers = [
    { id: '#CUST-001', name: 'Rohan Kumar', email: 'rohan.k@example.com', phone: '+91 98765 43210', orders: 24, spent: '₹12,450', status: 'Active' },
    { id: '#CUST-002', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91 98765 43213', orders: 56, spent: '₹45,900', status: 'VIP' },
    { id: '#CUST-003', name: 'Priya Singh', email: 'priya.s@example.com', phone: '+91 98765 43211', orders: 8, spent: '₹3,200', status: 'Active' },
    { id: '#CUST-004', name: 'Amit Sharma', email: 'amit.sh@example.com', phone: '+91 98765 43212', orders: 1, spent: '₹320', status: 'Inactive' },
    { id: '#CUST-005', name: 'Vikash Verma', email: 'vikash.v@example.com', phone: '+91 98765 43214', orders: 0, spent: '₹0', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Customers</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your customer base and view their purchase history.</p>
        </div>
        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all">
          Export Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Total Active</p>
            <p className="text-xl font-black text-slate-800 leading-tight">8,523</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-l-4 border-l-purple-500">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">VIP Customers</p>
            <p className="text-xl font-black text-slate-800 leading-tight">452</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-l-4 border-l-slate-400">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-500">
            <UserMinus size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Inactive (30+ Days)</p>
            <p className="text-xl font-black text-slate-800 leading-tight">1,204</p>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              className="w-full bg-white border border-slate-200 py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Customer Info</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-center">Total Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {customers.map((customer, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{customer.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 flex items-center gap-1.5"><Mail size={12}/> {customer.email}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5"><Phone size={12}/> {customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{customer.orders}</td>
                  <td className="px-6 py-4 font-black text-slate-700">{customer.spent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold
                      ${customer.status === 'VIP' ? 'bg-purple-100 text-purple-700' : 
                        customer.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        'bg-slate-100 text-slate-600'}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 p-1 rounded transition-colors">
                      <MoreVertical size={18} />
                    </button>
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