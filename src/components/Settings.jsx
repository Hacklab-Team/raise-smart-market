import React, { useState } from 'react';
import { 
  Store, 
  Bell, 
  Shield, 
  Save, 
  User, 
  MapPin, 
  Scale, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Settings() {
  const { isStoreOnline, setIsStoreOnline, addNotification } = useStore();

  const [orderAlerts, setOrderAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [scaleTolerance, setScaleTolerance] = useState('25');
  const [autoLockWheels, setAutoLockWheels] = useState(true);
  const [buzzerAlarms, setBuzzerAlarms] = useState(true);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Store operating and IoT scale calibration settings updated.',
      time: 'Just now'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Store Operating & IoT Fleet Settings</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Configure store metadata, anti-theft load cell scale sensitivity, and automated trolley locks.
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {savedBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>All store operating system and sensor threshold changes saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: General & Admin (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Store Information */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
              <Store className="text-blue-600" size={18} />
              <h3 className="font-extrabold text-slate-900 text-sm">Store General Profile</h3>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5">Store Brand Name</label>
                  <input 
                    type="text" 
                    defaultValue="RAISE Smart Market" 
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block mb-1.5">Contact Email</label>
                  <input 
                    type="email" 
                    defaultValue="support@raise-smartmarket.com" 
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1.5 flex items-center gap-1.5"><MapPin size={13}/> Store Location Address</label>
                <input 
                  type="text" 
                  defaultValue="Plot 42, Connaught Place Tech Hub, New Delhi, India" 
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none" 
                />
              </div>
            </div>
          </div>

          {/* IoT Hardware & Scale Calibration */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
              <Scale className="text-indigo-600" size={18} />
              <h3 className="font-extrabold text-slate-900 text-sm">IoT Load Cell Scale Calibration & Anti-Theft</h3>
            </div>
            <div className="p-6 space-y-5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Weight Mismatch Tolerance Threshold (±Grams)
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={scaleTolerance}
                    onChange={(e) => setScaleTolerance(e.target.value)}
                    className="w-24 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-mono font-bold focus:outline-none" 
                  />
                  <span className="text-slate-400 font-medium">
                    Variations below ±{scaleTolerance}g will be ignored (accounts for item packaging tolerances).
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100" onClick={() => setAutoLockWheels(!autoLockWheels)}>
                <div>
                  <p className="font-bold text-slate-800">Auto-Engage Magnetic Wheel Lock on Theft Flag</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Locks trolley wheels automatically when a weight mismatch is sensed</p>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${autoLockWheels ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${autoLockWheels ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100" onClick={() => setBuzzerAlarms(!buzzerAlarms)}>
                <div>
                  <p className="font-bold text-slate-800">Trigger Hardware Buzzer Chime on Mismatch</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Sounds piezoelectric buzzer on the cart to alert shopper</p>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${buzzerAlarms ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${buzzerAlarms ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Store Status & Alerts (1 col) */}
        <div className="space-y-6">
          
          {/* Store Online Toggle */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="text-emerald-600" size={18} />
              <h3 className="font-extrabold text-slate-900 text-sm">Store Live Status</h3>
            </div>
            
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsStoreOnline(!isStoreOnline)}>
              <div>
                <p className="font-bold text-slate-800 text-xs">Autonomous Shopping</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isStoreOnline ? 'Accepting trolley checkouts' : 'Market temporarily paused'}
                </p>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative ${isStoreOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isStoreOnline ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </div>
            </div>
          </div>

          {/* Notifications config */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="text-amber-500" size={18} />
              <h3 className="font-extrabold text-slate-900 text-sm">Alert Preferences</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setOrderAlerts(!orderAlerts)}>
                <div>
                  <p className="font-bold text-slate-800">Checkout Push Alerts</p>
                  <p className="text-[11px] text-slate-400">Notify on every completed cart</p>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors relative ${orderAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${orderAlerts ? 'translate-x-5' : 'translate-x-1'}`}></div>
                </div>
              </div>

              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStockAlerts(!stockAlerts)}>
                <div>
                  <p className="font-bold text-slate-800">Low Stock Push Alerts</p>
                  <p className="text-[11px] text-slate-400">Notify when stock ≤ 15 units</p>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors relative ${stockAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${stockAlerts ? 'translate-x-5' : 'translate-x-1'}`}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}