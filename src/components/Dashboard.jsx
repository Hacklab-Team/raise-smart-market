import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Activity, 
  ShoppingCart, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Cpu,
  ChevronRight,
  Eye,
  Receipt
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Dashboard({ setActiveTab }) {
  const { 
    trolleys, 
    orders, 
    products, 
    totalRevenue, 
    liveInStoreCartValue, 
    mismatchCount, 
    activeTrolleysCount,
    setSelectedTrolleyId,
    resolveTrolleyAlert
  } = useStore();

  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Revenue trend data
  const revenueData = [
    { time: '08:00', amount: 1200, carts: 3 },
    { time: '10:00', amount: 3500, carts: 7 },
    { time: '12:00', amount: 4800, carts: 9 },
    { time: '14:00', amount: 5900, carts: 12 },
    { time: '16:00', amount: 7200, carts: 15 },
    { time: '18:00', amount: 11400, carts: 22 },
    { time: '20:00', amount: 8900, carts: 18 }
  ];

  // Category sales data
  const categoryData = [
    { name: 'Fruits & Veg', sales: 4500 },
    { name: 'Dairy & Eggs', sales: 3600 },
    { name: 'Beverages', sales: 2900 },
    { name: 'Snacks', sales: 2400 },
    { name: 'Staples', sales: 1800 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* 4 Hero KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Revenue</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">₹{totalRevenue.toLocaleString()}</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
                <TrendingUp size={14} /> +14.8% <span className="text-slate-400 font-medium">vs yesterday</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        {/* Live In-Store Cart Value */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Carts On Floor</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">₹{liveInStoreCartValue.toLocaleString()}</h3>
              <p className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span>Active shoppers purchasing</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <ShoppingCart size={24} />
            </div>
          </div>
        </div>

        {/* Active Smart Trolleys */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Trolley Fleet</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{activeTrolleysCount} / {trolleys.length}</h3>
              <p className="text-xs font-bold text-indigo-600 mt-2 flex items-center gap-1">
                <Cpu size={14} /> {trolleys.length - activeTrolleysCount} Idle/Docked at entrance
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>

        {/* Anti-Theft / Weight Verification Status */}
        <div className={`p-6 rounded-3xl shadow-xs border transition-shadow relative overflow-hidden group ${
          mismatchCount > 0 ? 'bg-red-50/40 border-red-200' : 'bg-white border-slate-200/80 hover:shadow-md'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${mismatchCount > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                Scale Verification
              </p>
              <h3 className={`text-3xl font-black mt-1 ${mismatchCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                {mismatchCount > 0 ? `${mismatchCount} Alert` : '100% OK'}
              </h3>
              <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${mismatchCount > 0 ? 'text-red-600 font-extrabold' : 'text-emerald-600'}`}>
                {mismatchCount > 0 ? (
                  <>
                    <AlertTriangle size={14} className="animate-pulse" /> Weight mismatch flagged
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} /> Anti-theft load cells synced
                  </>
                )}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              mismatchCount > 0 ? 'bg-red-100 text-red-600' : 'bg-purple-50 text-purple-600'
            }`}>
              {mismatchCount > 0 ? <AlertTriangle size={24} /> : <Activity size={24} />}
            </div>
          </div>
        </div>

      </div>

      {/* Live Trolley Fleet Snapshot (Smart Market Live Fleet) */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Live Trolley Fleet Status</h3>
              <p className="text-xs font-medium text-slate-500">Real-time cart load cells, barcodes scanned, and anti-theft telemetry.</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('trolleys')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <span>Open Full Fleet Dashboard</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Trolley ID</th>
                <th className="px-6 py-4">Shopper</th>
                <th className="px-6 py-4">Last Item Scanned</th>
                <th className="px-6 py-4">Cart Total</th>
                <th className="px-6 py-4">Weight Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {trolleys.map((t) => {
                const isMismatch = t.status === 'mismatch';
                const cartSum = t.cart.reduce((s, i) => s + (i.price * i.qty), 0);
                return (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-black text-blue-600">
                      {t.id}
                      <span className="text-[10px] font-sans font-bold text-slate-400 block">{t.battery}% Battery</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {t.customer?.name || <span className="text-slate-400 font-normal">Unassigned / Idle</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium text-xs">
                      {t.lastItem}
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      ₹{cartSum}
                      <span className="text-[11px] font-semibold text-slate-400 block">{t.cart.length} items</span>
                    </td>
                    <td className="px-6 py-4">
                      {isMismatch ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-extrabold animate-pulse">
                          <AlertTriangle size={13} /> Weight Mismatch (+300g)
                        </span>
                      ) : t.status === 'charging' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold">
                          Charging
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                          <CheckCircle2 size={13} /> Verified ({t.measuredWeight}g)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isMismatch ? (
                        <button
                          onClick={() => resolveTrolleyAlert(t.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                        >
                          Clear Alert
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedTrolleyId(t.id);
                            setActiveTab('trolleys');
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                        >
                          Inspect
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Trend Area Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Today's Revenue & Shopping Flow</h3>
              <p className="text-xs text-slate-400 font-medium">Real-time checkout velocity across operating hours</p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
              Live Sensor Feed
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} prefix="₹" dx={-10} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80">
          <h3 className="text-lg font-black text-slate-900 mb-1">Top Selling Categories</h3>
          <p className="text-xs text-slate-400 font-medium mb-6">Distribution of scanned products</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{top: 0, right: 0, left: 10, bottom: 0}}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 700, fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 10px rgb(0 0 0 / 0.05)'}} />
                <Bar dataKey="sales" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Completed Orders Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black text-slate-900">Recent Cashierless Checkouts</h3>
            <p className="text-xs text-slate-400 font-medium">Orders completed autonomously from smart trolley touchscreens</p>
          </div>
          <button 
            onClick={() => setActiveTab('orders')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            View All Checkouts
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Trolley</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono font-black text-slate-800">{order.id}</td>
                  <td className="px-6 py-4 font-mono font-bold text-blue-600">{order.trolleyId}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium text-xs">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-700">
                      {order.paymentMode}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900 text-right">₹{order.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedReceipt(order)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Receipt"
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

      {/* Quick Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-sm font-black text-slate-800">Checkout Receipt</span>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="text-center py-2">
              <h4 className="text-xl font-black text-slate-900">RAISE SMART MARKET</h4>
              <p className="text-xs text-slate-400">Autonomous Trolley Receipt</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt No:</span>
                <span className="font-mono font-bold text-slate-800">{selectedReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trolley Used:</span>
                <span className="font-mono font-bold text-blue-600">{selectedReceipt.trolleyId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-800">{selectedReceipt.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-emerald-600">{selectedReceipt.paymentMode}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid:</span>
                <span className="text-emerald-600">₹{selectedReceipt.amount}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}