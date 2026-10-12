import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Truck, 
  PackageCheck,
  Receipt,
  ShoppingCart,
  QrCode,
  Download,
  Printer,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Orders() {
  const { orders } = useStore();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filters = ['All', 'Completed', 'Pending', 'UPI', 'Smart Cart Pay'];

  const filteredOrders = orders.filter(order => {
    const matchFilter = 
      activeFilter === 'All' ? true :
      activeFilter === 'Completed' ? order.status === 'Completed' :
      activeFilter === 'Pending' ? order.status === 'Pending' :
      order.paymentMode.toLowerCase().includes(activeFilter.toLowerCase());

    const matchSearch = 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.trolleyId?.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Autonomous Checkout Stream</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Real-time cashierless receipts generated across the smart trolley fleet.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>{orders.length} Total Checkouts Logged</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-2.5 text-slate-400" size={17} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, trolley, or customer..." 
              className="w-full bg-white border border-slate-200 py-2 pl-10 pr-4 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <span className="text-xs text-slate-400 font-bold">{filteredOrders.length} records</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Smart Trolley</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-mono font-black text-slate-900">{order.id}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{order.date}</p>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-blue-600">
                    {order.trolleyId || 'TRL-DEL-101'}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-slate-900 text-xs">{order.customer}</p>
                    <p className="text-[11px] text-slate-400">{order.itemsCount || 3} items purchased</p>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900">₹{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      {order.paymentMode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700">
                      <CheckCircle2 size={13} /> Weight Match OK
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedReceipt(order)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      title="Inspect Receipt"
                    >
                      <Receipt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Itemized Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Receipt size={16} className="text-blue-600" /> Digital Tax Invoice
              </span>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="text-center py-2 border-b border-dashed border-slate-200">
              <h4 className="text-lg font-black text-slate-900">RAISE SMART MARKET</h4>
              <p className="text-xs text-slate-400">Autonomous IoT Checkout Gate #01</p>
              <p className="text-[11px] font-mono text-slate-500 mt-1">Invoice: {selectedReceipt.id}</p>
            </div>

            <div className="text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-bold text-slate-800">{selectedReceipt.customer}</span>
              </div>
              <div className="flex justify-between">
                <span>Smart Trolley ID:</span>
                <span className="font-mono font-bold text-blue-600">{selectedReceipt.trolleyId}</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp:</span>
                <span className="font-medium text-slate-700">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold text-emerald-600">{selectedReceipt.paymentMode}</span>
              </div>
            </div>

            {/* Total */}
            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center font-black text-base text-slate-900 border border-slate-100">
              <span>Grand Total Paid:</span>
              <span className="text-emerald-600 text-xl">₹{selectedReceipt.amount}</span>
            </div>

            {/* Exit pass code */}
            <div className="text-center p-3 border border-slate-200 rounded-xl bg-slate-50/50">
              <p className="text-[10px] uppercase font-bold text-slate-400">Exit Gate Turnstile Code</p>
              <p className="font-mono text-sm font-black text-slate-900 tracking-widest mt-0.5">
                {selectedReceipt.id.replace('#', '')}-GATE-OK
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer size={14} /> Print Receipt
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}