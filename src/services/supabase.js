import { createClient } from '@supabase/supabase-js';

// Default / stored credentials
const STORAGE_URL_KEY = 'raise_supabase_url';
const STORAGE_ANON_KEY = 'raise_supabase_anon_key';

let cachedClient = null;

export const getSupabaseConfig = () => {
  const url = localStorage.getItem(STORAGE_URL_KEY) || import.meta.env.VITE_SUPABASE_URL || '';
  const key = localStorage.getItem(STORAGE_ANON_KEY) || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return {
    url,
    key,
    isConfigured: Boolean(url && key && url.includes('supabase.co')),
  };
};

export const getSupabaseClient = () => {
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;

  if (!cachedClient) {
    try {
      cachedClient = createClient(url, key, {
        auth: { persistSession: true },
        realtime: { params: { eventsPerSecond: 10 } }
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return cachedClient;
};

export const saveSupabaseConfig = async (url, key) => {
  const trimmedUrl = url.trim();
  const trimmedKey = key.trim();

  localStorage.setItem(STORAGE_URL_KEY, trimmedUrl);
  localStorage.setItem(STORAGE_ANON_KEY, trimmedKey);
  cachedClient = null; // reset cached instance

  if (!trimmedUrl || !trimmedKey) {
    return { success: false, message: 'URL and Anon Key cannot be empty' };
  }

  try {
    const client = createClient(trimmedUrl, trimmedKey);
    // Ping by checking any standard health or simple query
    const { data, error } = await client.from('products').select('count', { count: 'exact', head: true });
    
    // Even if table doesn't exist yet (404 / 42P01), if we get response from Supabase, auth is valid!
    if (error && error.code !== '42P01') {
      return { 
        success: false, 
        message: `Supabase returned error: ${error.message} (${error.code || 'Auth Error'})` 
      };
    }

    return { 
      success: true, 
      message: error?.code === '42P01' 
        ? 'Connected to Supabase! (Tables need to be created using the SQL script below)' 
        : 'Successfully connected and verified Supabase database!' 
    };
  } catch (err) {
    return { success: false, message: `Connection failed: ${err.message}` };
  }
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(STORAGE_URL_KEY);
  localStorage.removeItem(STORAGE_ANON_KEY);
  cachedClient = null;
};

// SQL Schema for the user to paste into Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- RAISE SMART MARKET DATABASE SCHEMA
-- Run this in your Supabase Project -> SQL Editor

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE (Synced with Smart Trolley barcode scanners & scale weights)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    barcode TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    weight_grams NUMERIC(10, 2) NOT NULL DEFAULT 100.00,
    stock INTEGER NOT NULL DEFAULT 50,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TROLLEYS TABLE (Live IoT Fleet telemetry)
CREATE TABLE IF NOT EXISTS public.trolleys (
    id TEXT PRIMARY KEY,
    battery_level INTEGER DEFAULT 100,
    status TEXT NOT NULL DEFAULT 'idle', -- 'idle', 'active', 'mismatch', 'charging'
    current_customer_name TEXT,
    current_customer_phone TEXT,
    items_count INTEGER DEFAULT 0,
    total_amount NUMERIC(10, 2) DEFAULT 0.00,
    measured_weight NUMERIC(10, 2) DEFAULT 0.00,
    expected_weight NUMERIC(10, 2) DEFAULT 0.00,
    security_alert TEXT,
    last_item_scanned TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CART ITEMS TABLE (Live items inside trolleys)
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trolley_id TEXT REFERENCES public.trolleys(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price NUMERIC(10, 2) NOT NULL,
    unit_weight NUMERIC(10, 2) NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ORDERS TABLE (Completed checkouts from trolleys)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    trolley_id TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_mode TEXT DEFAULT 'UPI', -- 'UPI', 'CARD', 'CASH'
    status TEXT DEFAULT 'Completed', -- 'Completed', 'Pending', 'Cancelled'
    items_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Realtime Replication for Instant Trolley & Order syncing
ALTER PUBLICATION supabase_realtime ADD TABLE public.trolleys;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cart_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- 7. Disable RLS for easy dev testing (or configure permissive policies)
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.trolleys DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
`;
