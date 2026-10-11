import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Target, Activity, Zap } from 'lucide-react';

export default function Analytics() {
  // डमी डेटा - Blinkit/Zepto स्टाइल
  const locationData = [
    { name: 'Tier 1 City', sales: 450000, color: '#8b5cf6' },
    { name: 'Tier 2 City', sales: 320000, color: '#3b82f6' },
    { name: 'Tier 3 City', sales: 180000, color: '#10b981' },
  ];

  const itemTypeData = [
    { name: 'Fruits & Veg', value: 35, color: '#10b981' },
    { name: 'Snacks', value: 25, color: '#f59e0b' },
    { name: 'Dairy', value: 20, color: '#3b82f6' },
    { name: 'Beverages', value: 15, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ];

  const weeklyTraffic = [
    { day: 'Mon', visitors: 4000, buyers: 2400 },
    { day: 'Tue', visitors: 3000, buyers: 1398 },
    { day: 'Wed', visitors: 2000, buyers: 9800 },
    { day: 'Thu', visitors: 2780, buyers: 3908 },
    { day: 'Fri', visitors: 1890, buyers: 4800 },
    { day: 'Sat', visitors: 2390, buyers: 3800 },
    { day: 'Sun', visitors: 3490, buyers: 4300 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Reports & Analytics</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Deep dive into your store's performance, traffic, and sales data.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all">
            Download PDF
          </button>
        </div>
      </div>

      {/* 4 Deep Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative">
            <TrendingUp className="text-blue-500 mb-4" size={28} />
            <p className="text-sm font-bold text-slate-500">Avg. Order Value</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">₹485.50</h3>
            <p className="text-xs font-bold text-green-500 mt-2">↑ 4.2% from last week</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-purple-200 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative">
            <Target className="text-purple-500 mb-4" size={28} />
            <p className="text-sm font-bold text-slate-500">Conversion Rate</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">12.4%</h3>
            <p className="text-xs font-bold text-green-500 mt-2">↑ 1.1% from last week</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-green-200 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative">
            <Activity className="text-green-500 mb-4" size={28} />
            <p className="text-sm font-bold text-slate-500">Customer Retention</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">68.2%</h3>
            <p className="text-xs font-bold text-red-500 mt-2">↓ 0.4% from last week</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-orange-200 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative">
            <Zap className="text-orange-500 mb-4" size={28} />
            <p className="text-sm font-bold text-slate-500">App Load Time</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">1.2s</h3>
            <p className="text-xs font-bold text-green-500 mt-2">Optimal Speed ⚡</p>
          </div>
        </div>
      </div>

      {/* Advanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sales by Location (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-800 mb-6">Sales by Outlet Location</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="sales" radius={[6, 6, 0, 0]} barSize={40}>
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Item Types Distribution (Donut Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-800 mb-6">Sales by Item Category</h3>
          <div className="h-72 flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={itemTypeData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {itemTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 600, color: '#64748b'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic vs Buyers (Double Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-extrabold text-slate-800">Weekly Traffic vs Conversions</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTraffic} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 600, color: '#64748b', paddingTop: '20px'}} />
                <Bar dataKey="visitors" name="Store Visitors" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="buyers" name="Actual Buyers" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}