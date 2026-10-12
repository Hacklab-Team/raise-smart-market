import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Target, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Clock, 
  DollarSign,
  ShoppingCart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Analytics() {
  const { totalRevenue, orders } = useStore();

  const aisleData = [
    { name: 'Fresh Produce (Aisle 1)', sales: 45000, color: '#10b981' },
    { name: 'Dairy & Chilled (Aisle 2)', sales: 38000, color: '#3b82f6' },
    { name: 'Snacks & Beverages (Aisle 3)', sales: 29000, color: '#8b5cf6' },
    { name: 'Grains & Staples (Aisle 4)', sales: 21000, color: '#f59e0b' },
  ];

  const categoryShare = [
    { name: 'Fruits & Veg', value: 35, color: '#10b981' },
    { name: 'Snacks', value: 25, color: '#f59e0b' },
    { name: 'Dairy', value: 20, color: '#3b82f6' },
    { name: 'Beverages', value: 15, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ];

  const weeklyTraffic = [
    { day: 'Mon', shoppers: 240, checkouts: 220 },
    { day: 'Tue', shoppers: 280, checkouts: 265 },
    { day: 'Wed', shoppers: 310, checkouts: 295 },
    { day: 'Thu', shoppers: 390, checkouts: 380 },
    { day: 'Fri', shoppers: 520, checkouts: 505 },
    { day: 'Sat', shoppers: 780, checkouts: 760 },
    { day: 'Sun', shoppers: 890, checkouts: 875 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Smart Market Loss Prevention & Fleet ROI</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Store velocity metrics, anti-theft load cell accuracy, and checkout conversion rates.
          </p>
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold outline-none">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
          <button 
            onClick={() => window.print()}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all"
          >
            Export Analytics PDF
          </button>
        </div>
      </div>

      {/* 4 Deep Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Cart Value</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">₹520.40</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">↑ 8.4% with smart cart upsells</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Anti-Theft Saved</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">₹14,280</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">18 unscanned items caught</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Session Time</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">11.4 mins</h3>
              <p className="text-xs font-bold text-blue-600 mt-2">60% faster than cashier lines</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Clock size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Checkout Conversion</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">98.4%</h3>
              <p className="text-xs font-bold text-emerald-600 mt-2">Near zero cart abandonment</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Zap size={24} />
            </div>
          </div>
        </div>

      </div>

      {/* Advanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sales by Aisle */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80">
          <h3 className="text-base font-black text-slate-900 mb-1">Sales by Market Aisle</h3>
          <p className="text-xs text-slate-400 font-medium mb-6">Which sections generate highest cart revenue</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aisleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="sales" radius={[8, 8, 0, 0]} barSize={36}>
                  {aisleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Item Types Distribution (Donut Chart) */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80">
          <h3 className="text-base font-black text-slate-900 mb-1">Scanned Product Category Share</h3>
          <p className="text-xs text-slate-400 font-medium mb-6">Percentage breakdown of total basket units</p>
          <div className="h-72 flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShare}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 10px rgb(0 0 0 / 0.05)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 600, color: '#64748b'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Shoppers vs Autonomous Checkouts */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-black text-slate-900">Weekly Shoppers vs Completed Checkouts</h3>
              <p className="text-xs text-slate-400 font-medium">Tracking autonomous turnstile conversion throughput</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTraffic} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 600, color: '#64748b'}} />
                <Bar dataKey="shoppers" name="Shoppers Entered" fill="#94a3b8" radius={[6, 6, 0, 0]} barSize={22} />
                <Bar dataKey="checkouts" name="Smart Cart Paid" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}