import React, { useState } from 'react';
import { Store, Bell, Shield, Save, User, MapPin } from 'lucide-react';

export default function Settings() {
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [storeStatus, setStoreStatus] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Store Settings</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your store details, notifications, and security preferences.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-blue-200 transition-all flex items-center gap-2 active:scale-95">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - General Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Store Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <Store className="text-blue-500" size={20} />
              <h3 className="font-extrabold text-slate-800">General Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-600">Store Name</label>
                  <input type="text" defaultValue="RAISE Smart Market" className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-600">Contact Email</label>
                  <input type="email" defaultValue="admin@raise-market.com" className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-600 flex items-center gap-2"><MapPin size={14}/> Store Address</label>
                <textarea rows="3" defaultValue="123, Smart City Hub, New Delhi, India" className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <User className="text-purple-500" size={20} />
              <h3 className="font-extrabold text-slate-800">Admin Profile</h3>
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
                AS
              </div>
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-600">Full Name</label>
                    <input type="text" defaultValue="Akshay Sharma" className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-600">Role</label>
                    <input type="text" defaultValue="Super Admin" disabled className="w-full bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-500 cursor-not-allowed" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preferences */}
        <div className="space-y-6">
          
          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <Bell className="text-orange-500" size={20} />
              <h3 className="font-extrabold text-slate-800">Notifications</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setOrderAlerts(!orderAlerts)}>
                <div>
                  <p className="font-bold text-slate-800 text-sm">New Order Alerts</p>
                  <p className="text-xs text-slate-500 mt-0.5">Push notifications for new orders</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative ${orderAlerts ? 'bg-green-500' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${orderAlerts ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStockAlerts(!stockAlerts)}>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Low Stock Warnings</p>
                  <p className="text-xs text-slate-500 mt-0.5">Alerts when inventory is low</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative ${stockAlerts ? 'bg-green-500' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${stockAlerts ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Store Status / Security */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <Shield className="text-red-500" size={20} />
              <h3 className="font-extrabold text-slate-800">System Status</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStoreStatus(!storeStatus)}>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Store Online Status</p>
                  <p className="text-xs text-slate-500 mt-0.5">{storeStatus ? 'Customers can place orders' : 'Store is currently closed'}</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative ${storeStatus ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${storeStatus ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <button className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 rounded-lg text-sm font-bold transition-all">
                  Change Password
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}