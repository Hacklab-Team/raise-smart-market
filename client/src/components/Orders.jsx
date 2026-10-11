import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle2, XCircle, Clock, Truck, PackageCheck } from 'lucide-react';

export default function Orders() {
  const [activeFilter, setActiveFilter] = useState('All');

  // डमी ऑर्डर्स डेटा
  const orders = [
    { id: '#ORD-7021', date: 'Today, 09:45 AM', customer: 'Rohan Kumar', items: '4 items', amount: '₹840', status: 'Pending' },
    { id: '#ORD-7022', date: 'Today, 09:30 AM', customer: 'Priya Singh', items: '12 items', amount: '₹2,150', status: 'Processing' },
    { id: '#ORD-7023', date: 'Today, 09:15 AM', customer: 'Amit Sharma', items: '2 items', amount: '₹320', status: 'Out for Delivery' },
    { id: '#ORD-7024', date: 'Today, 08:50 AM', customer: 'Neha Gupta', items: '7 items', amount: '₹1,450', status: 'Delivered' },
    { id: '#ORD-7025', date: 'Yesterday, 07:30 PM', customer: 'Vikash Verma', items: '1 item', amount: '₹120', status: 'Cancelled' },
  ];

  const filters = ['All', 'Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Pending': return { color: 'text-yellow-700 bg-yellow-100', icon: <Clock size={14} /> };
      case 'Processing': return { color: 'text-blue-700 bg-blue-100', icon: <PackageCheck size={14} /> };
      case 'Out for Delivery': return { color: 'text-purple-700 bg-purple-100', icon: <Truck size={14} /> };
      case 'Delivered': return { color: 'text-green-700 bg-green-100', icon: <CheckCircle2 size={14} /> };
      case 'Cancelled': return { color: 'text-red-700 bg-red-100', icon: <XCircle size={14} /> };
      default: return { color: 'text-slate-700 bg-slate-100', icon: null };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Live Orders</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Track, process, and manage customer orders in real-time.</p>
        </div>
      </div>

      {/* Modern Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
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
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {orders.map((order, idx) => {
                const style = getStatusStyle(order.status);
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-black text-blue-600">{order.id}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{order.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{order.customer}</p>
                      <p className="text-xs text-slate-500 font-medium">{order.items}</p>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-700">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold w-fit ${style.color}`}>
                        {style.icon}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === 'Pending' && (
                          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
                            Accept
                          </button>
                        )}
                        <button className="text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 p-1.5 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}