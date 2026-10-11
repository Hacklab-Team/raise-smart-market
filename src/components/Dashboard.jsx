import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

export default function Dashboard() {
  // Graph ke liye dummy data (Lezato/Blinkit style)
  const revenueData = [
    { time: '08:00', amount: 1200 }, { time: '10:00', amount: 3500 },
    { time: '12:00', amount: 2800 }, { time: '14:00', amount: 5900 },
    { time: '16:00', amount: 4200 }, { time: '18:00', amount: 8100 },
    { time: '20:00', amount: 6500 }
  ];

  const categoryData = [
    { name: 'Grocery', sales: 4500 },
    { name: 'Dairy', sales: 3200 },
    { name: 'Snacks', sales: 2800 },
    { name: 'Beverages', sales: 2100 },
  ];

  const recentOrders = [
    { id: '#ORD-5210', name: 'Mahmoud Ali', date: '14/3/2026', amount: '₹1,240', status: 'Complete', color: 'text-green-600 bg-green-100' },
    { id: '#ORD-5211', name: 'Priya Singh', date: '14/3/2026', amount: '₹450', status: 'Pending', color: 'text-yellow-600 bg-yellow-100' },
    { id: '#ORD-5212', name: 'Rohan Kumar', date: '14/3/2026', amount: '₹890', status: 'Complete', color: 'text-green-600 bg-green-100' },
    { id: '#ORD-5213', name: 'Jessica Sameh', date: '14/3/2026', amount: '₹320', status: 'Pending', color: 'text-yellow-600 bg-yellow-100' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top 4 KPI Cards (Amazon Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">₹87,561</h3>
            <p className="text-xs font-bold text-green-500 mt-2">+12.5% <span className="text-slate-400 font-medium">vs yesterday</span></p>
          </div>
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500"><DollarSign size={28} /></div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">1,247</h3>
            <p className="text-xs font-bold text-green-500 mt-2">+8.2% <span className="text-slate-400 font-medium">vs yesterday</span></p>
          </div>
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500"><ShoppingBag size={28} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Customers</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">8,523</h3>
            <p className="text-xs font-bold text-blue-500 mt-2">+5.4% <span className="text-slate-400 font-medium">vs last week</span></p>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500"><Users size={28} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Rating</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">4.8</h3>
            <p className="text-xs font-bold text-purple-500 mt-2">Top 5% <span className="text-slate-400 font-medium">in region</span></p>
          </div>
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500"><Activity size={28} /></div>
        </div>
      </div>

      {/* Graphs Section (Zepto / Lezato Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-extrabold text-slate-800">Today's Revenue Trend</h3>
            <button className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200">View Full Report</button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} prefix="₹" dx={-10} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Bar Chart (Blinkit Style) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-extrabold text-slate-800 mb-6">Top Categories</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{top: 0, right: 0, left: 10, bottom: 0}}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600, fontSize: 13}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Last Orders Table (Amazon Style) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-extrabold text-slate-800">Recent Orders</h3>
          <input type="text" placeholder="Search orders..." className="bg-slate-50 border border-slate-200 py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-black text-slate-600">{order.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">{order.name.charAt(0)}</div>
                    {order.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-800 text-right">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}