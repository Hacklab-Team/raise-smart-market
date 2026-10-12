import React, { useState } from 'react';
import { 
  Smartphone, 
  ShoppingCart, 
  QrCode, 
  CreditCard, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Receipt, 
  ChevronRight,
  User,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ClientDashboard({ setActiveTab }) {
  const { 
    trolleys, 
    selectedTrolleyId, 
    setSelectedTrolleyId, 
    products, 
    scanItemToTrolley, 
    removeItemFromTrolley, 
    checkoutTrolley 
  } = useStore();

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  // Active trolley that the client is viewing on their cart tablet
  const activeTrolley = trolleys.find(t => t.id === selectedTrolleyId) || trolleys.find(t => t.cart.length > 0) || trolleys[0];
  const cartTotal = activeTrolley.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItemsCount = activeTrolley.cart.reduce((sum, item) => sum + item.qty, 0);
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + tax;

  const handleClientPay = (paymentMode) => {
    const order = checkoutTrolley(activeTrolley.id, paymentMode);
    if (order) {
      setLastReceipt(order);
      setCheckoutModal(true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Smartphone size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Client Cart & Shopper Tablet OS</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Real-time interactive client interface mounted on smart trolleys, with cashierless one-tap payments.
              </p>
            </div>
          </div>
        </div>

        {/* Trolley Switcher for Client View */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">Connected Cart:</span>
          <select
            value={activeTrolley.id}
            onChange={(e) => setSelectedTrolleyId(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {trolleys.map(t => (
              <option key={t.id} value={t.id}>
                {t.id} ({t.customer?.name || 'Walk-in'} - ₹{t.cart.reduce((s, i) => s + (i.price * i.qty), 0)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Two Columns: Left Live In-Store Shoppers Session Table, Right Client Cart Screen Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live In-Store Shoppers Session Table (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">Active Shopper Sessions ({trolleys.filter(t => t.customer).length})</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                Live Store Floor
              </span>
            </div>

            <div className="space-y-3">
              {trolleys.filter(t => t.customer).map(t => {
                const isSelected = t.id === activeTrolley.id;
                const cTotal = t.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTrolleyId(t.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500/20 shadow-xs' 
                        : 'border-slate-200/80 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                          {t.customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm">{t.customer.name}</p>
                          <p className="text-[11px] font-medium text-slate-400">{t.customer.phone}</p>
                        </div>
                      </div>

                      <span className="font-mono text-xs font-black text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-lg">
                        {t.id}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-500 font-semibold">{t.cart.length} items • {t.startedAt}</span>
                      <span className="font-black text-slate-900 text-sm">₹{cTotal}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 space-y-1">
              <p className="font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" /> Supabase Realtime Sync
              </p>
              <p className="text-[11px] leading-relaxed">
                Shopper cart changes are synced immediately over Supabase Channels, updating both this screen and the store admin portal instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Client Tablet Mounted Screen (7 cols) */}
        <div className="lg:col-span-7">
          
          {/* Simulated Physical Cart Tablet Frame */}
          <div className="bg-slate-900 p-4 md:p-6 rounded-[2.5rem] shadow-2xl border-4 border-slate-800">
            
            {/* Tablet Inner Screen */}
            <div className="bg-[#f8fafc] rounded-3xl overflow-hidden shadow-inner border border-slate-200 min-h-[580px] flex flex-col justify-between">
              
              {/* Tablet Top Header (Client Branding) */}
              <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                    <ShoppingCart size={18} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base leading-tight">RAISE Smart Cart</h3>
                    <p className="text-[11px] font-bold text-slate-400">Cart ID: {activeTrolley.id}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-black text-slate-800">{activeTrolley.customer?.name || 'Shopper'}</p>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-end">
                    <ShieldCheck size={12} /> Weight Scale Verified
                  </p>
                </div>
              </div>

              {/* Tablet Center: Live Cart Items List */}
              <div className="p-6 flex-1 overflow-y-auto space-y-3 max-h-[340px]">
                {activeTrolley.cart.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <ShoppingCart size={28} className="text-slate-300" />
                    </div>
                    <p className="font-bold text-slate-600">Your smart cart is empty</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Pick any item from the store shelf and scan the barcode under the cart camera to begin!
                    </p>
                  </div>
                ) : (
                  activeTrolley.cart.map(item => (
                    <div 
                      key={item.id} 
                      className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                          {products.find(p => p.id === item.id)?.image || '📦'}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 text-xs">{item.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">₹{item.price} • {item.weight}g</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-xl">
                          <button
                            onClick={() => removeItemFromTrolley(activeTrolley.id, item.id)}
                            className="p-1 hover:bg-white rounded-lg text-slate-600"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-black text-xs text-slate-800 w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => scanItemToTrolley(activeTrolley.id, item.id, false)}
                            className="p-1 hover:bg-white rounded-lg text-slate-600"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-black text-slate-900 text-sm w-16 text-right">
                          ₹{item.price * item.qty}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Tablet Bottom: Bill Breakdown & One-Tap Checkout */}
              <div className="bg-white p-6 border-t border-slate-200 space-y-4">
                
                {/* Bill Row */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal ({totalItemsCount} items)</span>
                    <span className="font-bold text-slate-700">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Store GST (5%)</span>
                    <span className="font-bold text-slate-700">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total Amount</span>
                    <span className="text-emerald-600 text-xl">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => handleClientPay('UPI (Scan QR)')}
                    disabled={activeTrolley.cart.length === 0 || activeTrolley.status === 'mismatch'}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <QrCode size={16} /> Pay via UPI / QR
                  </button>

                  <button
                    onClick={() => handleClientPay('Smart Cart Card Tap')}
                    disabled={activeTrolley.cart.length === 0 || activeTrolley.status === 'mismatch'}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <CreditCard size={16} /> Tap Card & Exit
                  </button>
                </div>

                {activeTrolley.status === 'mismatch' && (
                  <p className="text-center text-[11px] font-bold text-red-600 bg-red-50 p-2 rounded-xl border border-red-200">
                    ⚠️ Weight mismatch on cart scale. Please contact store assistant before checkout.
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Checkout Receipt Modal */}
      {checkoutModal && lastReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-black text-slate-900">Cashierless Checkout Verified!</h3>
              <p className="text-xs text-slate-500 mt-1">Receipt ID: {lastReceipt.id}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Customer:</span>
                <span className="font-bold text-slate-800">{lastReceipt.customer}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Smart Trolley:</span>
                <span className="font-mono font-bold text-slate-800">{lastReceipt.trolleyId}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Mode:</span>
                <span className="font-bold text-emerald-600">{lastReceipt.paymentMode}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Amount Paid:</span>
                <span className="text-emerald-600">₹{lastReceipt.amount}</span>
              </div>
            </div>

            {/* Exit Gate Barcode */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl text-center space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Store Exit Gate Pass</p>
              <div className="font-mono tracking-widest text-lg font-black text-slate-900 py-1">
                ||| | |||| | ||| |||| |
              </div>
              <p className="text-[10px] text-slate-400 font-mono">{lastReceipt.id}-EXIT-PASS</p>
            </div>

            <button
              onClick={() => setCheckoutModal(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Done & Return to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
