import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Battery, 
  BatteryCharging, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Volume2, 
  Scan, 
  Plus, 
  Trash2, 
  ArrowRight, 
  CreditCard,
  RefreshCw,
  Cpu,
  ShieldCheck,
  User,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function TrolleyDashboard({ setActiveTab }) {
  const { 
    trolleys, 
    products, 
    selectedTrolleyId, 
    setSelectedTrolleyId, 
    resolveTrolleyAlert, 
    lockTrolleyWheels, 
    scanItemToTrolley, 
    removeItemFromTrolley,
    checkoutTrolley 
  } = useStore();

  const [filter, setFilter] = useState('All');
  const [selectedProductToScan, setSelectedProductToScan] = useState(products[0]?.id || '');
  const [simulateMismatch, setSimulateMismatch] = useState(false);
  const [buzzerPinged, setBuzzerPinged] = useState(null);

  const selectedTrolley = trolleys.find(t => t.id === selectedTrolleyId) || trolleys[0];

  const filteredTrolleys = trolleys.filter(t => {
    if (filter === 'Active') return t.cart.length > 0;
    if (filter === 'Mismatch') return t.status === 'mismatch';
    if (filter === 'Charging') return t.status === 'charging';
    if (filter === 'Idle') return t.cart.length === 0 && t.status !== 'charging';
    return true;
  });

  const handlePingBuzzer = (id) => {
    setBuzzerPinged(id);
    setTimeout(() => setBuzzerPinged(null), 2000);
  };

  const handleScanSimulation = (e) => {
    e.preventDefault();
    if (!selectedTrolley || !selectedProductToScan) return;
    scanItemToTrolley(selectedTrolley.id, selectedProductToScan, simulateMismatch);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Top Banner / Headline */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Smart Trolley IoT Fleet & Sensor Telemetry</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Monitor live cart load cells, anti-theft weight verification, and fleet battery levels in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Action button to open Client View */}
        <button 
          onClick={() => setActiveTab('client')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <span>Open Client / Shopper Cart View</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Fleet KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Fleet</p>
          <p className="text-2xl font-black text-slate-800 mt-1">{trolleys.length} Trolleys</p>
          <span className="text-[10px] text-blue-600 font-bold">Smart IoT Enabled</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Shopping</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {trolleys.filter(t => t.cart.length > 0).length} Carts
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">On Store Floor</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-red-200 bg-red-50/20 shadow-xs">
          <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">Weight Mismatch</p>
          <p className="text-2xl font-black text-red-600 mt-1">
            {trolleys.filter(t => t.status === 'mismatch').length} Alert
          </p>
          <span className="text-[10px] text-red-600 font-bold">Requires Verification</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Idle & Ready</p>
          <p className="text-2xl font-black text-slate-700 mt-1">
            {trolleys.filter(t => t.cart.length === 0 && t.status !== 'charging').length} Ready
          </p>
          <span className="text-[10px] text-slate-500 font-bold">At Store Entrance</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Charging Docks</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {trolleys.filter(t => t.status === 'charging').length} Charging
          </p>
          <span className="text-[10px] text-amber-600 font-bold">Dock #02</span>
        </div>
      </div>

      {/* Main Grid: Left Fleet List / Cards, Right Focused Trolley Telemetry & Hardware Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Fleet Cards Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Filter Pills */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['All', 'Active', 'Mismatch', 'Charging', 'Idle'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filter === tab
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-semibold">{filteredTrolleys.length} visible</span>
          </div>

          {/* Trolley Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTrolleys.map(t => {
              const isSelected = t.id === selectedTrolley.id;
              const isMismatch = t.status === 'mismatch';
              const cartTotal = t.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
              const itemsCount = t.cart.reduce((sum, item) => sum + item.qty, 0);

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTrolleyId(t.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border text-left relative overflow-hidden ${
                    isSelected 
                      ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                  } ${isMismatch ? 'border-red-400 bg-red-50/10' : ''}`}
                >
                  {/* Top Header of Card */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-slate-800">{t.id}</span>
                        {isMismatch ? (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-100 text-red-700 flex items-center gap-1 animate-pulse">
                            <AlertTriangle size={11} /> Mismatch!
                          </span>
                        ) : t.status === 'charging' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 flex items-center gap-1">
                            <BatteryCharging size={11} /> Charging
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 size={11} /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        <span className="font-semibold text-slate-700">{t.customer?.name || 'Unassigned / Idle'}</span>
                      </p>
                    </div>

                    {/* Battery Pill */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-600">
                      <Battery size={13} className={t.battery > 50 ? 'text-emerald-500' : 'text-amber-500'} />
                      <span>{t.battery}%</span>
                    </div>
                  </div>

                  {/* Weight telemetry pill */}
                  <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Scale size={13} className="text-slate-400" />
                      <span>Scale Load:</span>
                    </div>
                    <div className="font-mono font-bold text-slate-800">
                      <span className={isMismatch ? 'text-red-600 font-black' : 'text-slate-800'}>
                        {t.measuredWeight}g
                      </span>
                      <span className="text-slate-400 font-normal"> / exp {t.expectedWeight}g</span>
                    </div>
                  </div>

                  {/* Cart Total & Items */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="font-bold text-slate-500">{itemsCount} items in cart</span>
                    <span className="font-black text-slate-900 text-sm">₹{cartTotal}</span>
                  </div>

                  {/* Wheel Lock Banner if engaged */}
                  {t.locked && (
                    <div className="mt-2.5 py-1 px-2 rounded-lg bg-red-100 text-red-700 text-[11px] font-bold flex items-center justify-center gap-1.5">
                      <Lock size={12} /> Wheel Lock Engaged (Anti-Theft)
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Trolley Detailed Telemetry & IoT Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Detailed Selected Trolley Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <h3 className="text-lg font-black text-slate-900">Telemetry: {selectedTrolley.id}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">Firmware v4.2</span>
            </div>

            {/* Mismatch Alert Box if flagged */}
            {selectedTrolley.status === 'mismatch' && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 space-y-3 animate-in zoom-in-95">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-red-700">Security Alert</p>
                    <p className="text-xs font-medium text-red-900 mt-0.5">{selectedTrolley.alert}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => resolveTrolleyAlert(selectedTrolley.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Clear Alert & Recalibrate
                  </button>
                  <button
                    onClick={() => handlePingBuzzer(selectedTrolley.id)}
                    className="bg-white border border-red-300 hover:bg-red-100 text-red-700 text-xs font-bold py-2 px-3 rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Volume2 size={14} /> {buzzerPinged === selectedTrolley.id ? 'Beeping...' : 'Beep'}
                  </button>
                </div>
              </div>
            )}

            {/* Shopper Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shopper Connected</p>
              {selectedTrolley.customer ? (
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <p className="font-extrabold text-slate-800 text-sm">{selectedTrolley.customer.name}</p>
                    <p className="text-slate-500 font-medium">{selectedTrolley.customer.phone}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 font-bold text-[11px]">
                    In-Store ({selectedTrolley.startedAt})
                  </span>
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium">No shopper currently assigned to this cart.</p>
              )}
            </div>

            {/* Cart Items List */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-slate-700">Cart Contents ({selectedTrolley.cart.length} unique items)</span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Total: ₹{selectedTrolley.cart.reduce((s, i) => s + (i.price * i.qty), 0)}
                </span>
              </div>

              {selectedTrolley.cart.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                  Cart is currently empty.
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {selectedTrolley.cart.map(item => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-[11px] text-slate-400">{item.qty} × ₹{item.price} ({item.weight}g each)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-800">₹{item.price * item.qty}</span>
                        <button
                          onClick={() => removeItemFromTrolley(selectedTrolley.id, item.id)}
                          className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hardware Controls */}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => lockTrolleyWheels(selectedTrolley.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedTrolley.locked 
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {selectedTrolley.locked ? <Unlock size={14} /> : <Lock size={14} />}
                {selectedTrolley.locked ? 'Unlock Wheels' : 'Lock Wheels'}
              </button>

              <button
                onClick={() => checkoutTrolley(selectedTrolley.id)}
                disabled={selectedTrolley.cart.length === 0}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <CreditCard size={14} /> Cashierless Pay
              </button>
            </div>
          </div>

          {/* Interactive IoT Hardware Barcode & Scale Simulator */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl text-white shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Scan size={18} className="text-blue-400" />
                <h4 className="text-sm font-black text-slate-100">IoT Hardware Simulator</h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                Live Sensor Feed
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Test how the Smart Trolley microcontroller (ESP32/RFID/Scale) sends scan and weight events to the system:
            </p>

            <form onSubmit={handleScanSimulation} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Select Product to Barcode-Scan:</label>
                <select
                  value={selectedProductToScan}
                  onChange={(e) => setSelectedProductToScan(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ₹{p.price} ({p.weight_grams}g)
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkbox to simulate weight mismatch */}
              <label className="flex items-center gap-2.5 p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  checked={simulateMismatch}
                  onChange={(e) => setSimulateMismatch(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <span className="text-xs text-slate-300 font-semibold">
                  Simulate theft / unscanned item (+350g weight mismatch)
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Scan size={15} /> Simulate Hardware Scan on {selectedTrolley.id}
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
