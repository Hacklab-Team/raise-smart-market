import React, { useState } from 'react';
import { 
  Database, 
  Check, 
  Copy, 
  Key, 
  Globe, 
  RefreshCw, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Radio, 
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  clearSupabaseConfig, 
  SUPABASE_SQL_SCHEMA,
  getSupabaseClient 
} from '../services/supabase';
import { useStore } from '../context/StoreContext';

export default function SupabaseIntegration() {
  const { 
    supabaseConnected, 
    setSupabaseConnected, 
    supabaseStatusMsg, 
    setSupabaseStatusMsg,
    products,
    trolleys,
    addNotification 
  } = useStore();

  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [key, setKey] = useState(currentConfig.key);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [seeding, setSeeding] = useState(false);

  const handleSaveAndTest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTestResult(null);

    const res = await saveSupabaseConfig(url, key);
    setLoading(false);
    setTestResult(res);

    if (res.success) {
      setSupabaseConnected(true);
      setSupabaseStatusMsg('Connected to Supabase');
      addNotification({
        type: 'success',
        title: 'Supabase Connected!',
        message: 'Admin portal, trolley IoT fleet, and client dashboards are now linked to Supabase.',
        time: 'Just now'
      });
    } else {
      setSupabaseConnected(false);
      setSupabaseStatusMsg(res.message);
    }
  };

  const handleDisconnect = () => {
    clearSupabaseConfig();
    setUrl('');
    setKey('');
    setSupabaseConnected(false);
    setSupabaseStatusMsg('Disconnected (Running in local demo mode)');
    setTestResult({ success: false, message: 'Disconnected from Supabase' });
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSeedData = async () => {
    const client = getSupabaseClient();
    if (!client) {
      alert('Please connect to Supabase first with a valid URL and Anon Key!');
      return;
    }

    setSeeding(true);
    try {
      // Seed products
      const productsToSeed = products.map(p => ({
        id: p.id,
        barcode: p.barcode,
        name: p.name,
        category: p.category,
        price: p.price,
        weight_grams: p.weight_grams,
        stock: p.stock
      }));

      const { error: prodErr } = await client.from('products').upsert(productsToSeed);
      if (prodErr) throw prodErr;

      // Seed trolleys
      const trolleysToSeed = trolleys.map(t => ({
        id: t.id,
        battery_level: t.battery,
        status: t.status,
        current_customer_name: t.customer?.name || null,
        current_customer_phone: t.customer?.phone || null,
        items_count: t.cart.length,
        total_amount: t.cart.reduce((s, i) => s + (i.price * i.qty), 0),
        measured_weight: t.measuredWeight,
        expected_weight: t.expectedWeight,
        last_item_scanned: t.lastItem
      }));

      const { error: trolleysErr } = await client.from('trolleys').upsert(trolleysToSeed);
      if (trolleysErr) throw trolleysErr;

      alert('✅ Successfully seeded sample products and trolleys into your Supabase database!');
    } catch (err) {
      alert(`Seed failed: ${err.message}. Make sure you executed the SQL Schema in your Supabase SQL Editor first!`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Database size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Supabase Backend Hub ("Suba Biz")</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Central PostgreSQL database and Realtime channel connecting the Admin Portal, Trolley IoT hardware, and Client Dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 text-xs font-bold ${
          supabaseConnected 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
            : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
          <span>{supabaseConnected ? 'Supabase Connected & Synced' : 'Demo / Offline Mode'}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Connection Form & Seed Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Credentials Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Key size={18} className="text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Supabase API Credentials</h3>
              </div>
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Supabase Dashboard <ExternalLink size={12} />
              </a>
            </div>

            <form onSubmit={handleSaveAndTest} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Supabase Project URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://xyzprojectid.supabase.co"
                    required
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Found in your Supabase Project Settings &rarr; API &rarr; Project URL
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Supabase Anon (Public) Key
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    required
                    className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 rounded-xl text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Found in your Supabase Project Settings &rarr; API &rarr; Project API keys (anon public)
                </p>
              </div>

              {/* Status Banner */}
              {testResult && (
                <div className={`p-3.5 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                  testResult.success 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  {testResult.success ? <CheckCircle2 size={16} className="text-emerald-600" /> : <AlertCircle size={16} className="text-red-600" />}
                  <span>{testResult.message}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                  {loading ? 'Testing Connection...' : 'Save & Verify Connection'}
                </button>

                {supabaseConnected && (
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </form>

            {/* Seed Starter Data Button */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Seed Starter Products & Trolleys</span>
                <button
                  onClick={handleSeedData}
                  disabled={seeding || !supabaseConnected}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Zap size={13} /> {seeding ? 'Seeding...' : 'Push Starter Data'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Populates your Supabase database with starter catalog items, sample active trolleys, and initial test records.
              </p>
            </div>
          </div>

          {/* Architecture / Multi-device flow */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Layers size={17} className="text-indigo-600" />
              How the 3 Systems Connect via Supabase
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Radio size={14} className="text-blue-500" /> 1. Smart Trolley IoT Device
                </p>
                <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                  ESP32 / Barcode Scanner scans item barcode &rarr; Sends REST POST or RPC to Supabase <code className="font-mono bg-white px-1 py-0.5 rounded border">cart_items</code>. The load cell sends live weight updates to <code className="font-mono bg-white px-1 py-0.5 rounded border">trolleys</code>.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Zap size={14} className="text-emerald-500" /> 2. Client / Shopper Tablet
                </p>
                <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                  Mounted tablet subscribes to Supabase Realtime channel <code className="font-mono bg-white px-1 py-0.5 rounded border">trolley_id</code>. Whenever a product is added or removed, the screen reflects the updated cart and bill within 10 milliseconds.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-purple-500" /> 3. Admin Operating System
                </p>
                <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                  Store staff monitor weight discrepancies, battery levels, inventory depletion, and cashierless transactions across all smart trolleys in real-time.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: SQL Schema Viewer & Copy (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0b0f19] text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-emerald-400" />
                <h3 className="text-sm font-black text-slate-100">Supabase SQL Schema (1-Click Copy)</h3>
              </div>
              <button
                onClick={handleCopySQL}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
              >
                {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                <span>{copied ? 'SQL Copied!' : 'Copy SQL'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Open your Supabase Project &rarr; <strong>SQL Editor</strong>, paste this script, and click <strong>Run</strong>. This creates the tables for products, trolleys, cart items, orders, and enables Realtime replication:
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 max-h-[480px] overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300">
              <pre>{SUPABASE_SQL_SCHEMA}</pre>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
