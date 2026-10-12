import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabaseClient, getSupabaseConfig } from '../services/supabase';

const StoreContext = createContext();

const INITIAL_PRODUCTS = [
  { id: 'PRD-01', barcode: '8901030383121', name: 'Fresh Royal Gala Apples (1kg)', category: 'Fruits', price: 180, weight_grams: 1000, stock: 45, status: 'In Stock', image: '🍎' },
  { id: 'PRD-02', barcode: '8901030383122', name: 'Farm Fresh Bananas (1 Dozen)', category: 'Fruits', price: 60, weight_grams: 1200, stock: 12, status: 'Low Stock', image: '🍌' },
  { id: 'PRD-03', barcode: '8901030383123', name: 'Amul Taaza Toned Milk (1L)', category: 'Dairy', price: 56, weight_grams: 1030, stock: 80, status: 'In Stock', image: '🥛' },
  { id: 'PRD-04', barcode: '8901030383124', name: 'Tata Tea Gold Premium (500g)', category: 'Beverages', price: 290, weight_grams: 520, stock: 35, status: 'In Stock', image: '☕' },
  { id: 'PRD-05', barcode: '8901030383125', name: 'Cadbury Dairy Milk Silk (150g)', category: 'Snacks', price: 175, weight_grams: 160, stock: 95, status: 'In Stock', image: '🍫' },
  { id: 'PRD-06', barcode: '8901030383126', name: 'Britannia 100% Whole Wheat Bread (400g)', category: 'Bakery', price: 50, weight_grams: 410, stock: 7, status: 'Low Stock', image: '🍞' },
  { id: 'PRD-07', barcode: '8901030383127', name: 'Fortune Sunlite Refined Oil (1L)', category: 'Staples', price: 145, weight_grams: 920, stock: 28, status: 'In Stock', image: '🌻' },
  { id: 'PRD-08', barcode: '8901030383128', name: 'Aashirvaad Shudh Chakki Atta (5kg)', category: 'Staples', price: 240, weight_grams: 5050, stock: 0, status: 'Out of Stock', image: '🌾' },
];

const INITIAL_TROLLEYS = [
  {
    id: 'TRL-DEL-101',
    battery: 88,
    status: 'verified', // 'verified', 'mismatch', 'idle', 'charging'
    customer: { name: 'Rohan Kumar', phone: '+91 98765 43210', id: 'CUST-001' },
    cart: [
      { id: 'PRD-01', name: 'Fresh Royal Gala Apples (1kg)', qty: 1, price: 180, weight: 1000 },
      { id: 'PRD-03', name: 'Amul Taaza Toned Milk (1L)', qty: 2, price: 56, weight: 1030 },
      { id: 'PRD-04', name: 'Tata Tea Gold Premium (500g)', qty: 1, price: 290, weight: 520 },
    ],
    lastItem: 'Tata Tea Gold Premium (500g)',
    expectedWeight: 3580,
    measuredWeight: 3580,
    locked: false,
    alert: null,
    startedAt: '12 mins ago',
  },
  {
    id: 'TRL-DEL-102',
    battery: 64,
    status: 'mismatch',
    customer: { name: 'Priya Singh', phone: '+91 98765 43211', id: 'CUST-003' },
    cart: [
      { id: 'PRD-05', name: 'Cadbury Dairy Milk Silk (150g)', qty: 1, price: 175, weight: 160 },
      { id: 'PRD-06', name: 'Britannia Whole Wheat Bread', qty: 1, price: 50, weight: 410 },
    ],
    lastItem: 'Cadbury Dairy Milk Silk (150g)',
    expectedWeight: 570,
    measuredWeight: 870, // +300g difference
    locked: true,
    alert: 'Weight Mismatch: Scale measured +300g extra weight. Possible unscanned item on cart base!',
    startedAt: '7 mins ago',
  },
  {
    id: 'TRL-DEL-103',
    battery: 95,
    status: 'verified',
    customer: { name: 'Amit Sharma', phone: '+91 98765 43212', id: 'CUST-004' },
    cart: [
      { id: 'PRD-07', name: 'Fortune Sunlite Refined Oil (1L)', qty: 1, price: 145, weight: 920 },
    ],
    lastItem: 'Fortune Sunlite Refined Oil (1L)',
    expectedWeight: 920,
    measuredWeight: 920,
    locked: false,
    alert: null,
    startedAt: '3 mins ago',
  },
  {
    id: 'TRL-DEL-104',
    battery: 28,
    status: 'charging',
    customer: null,
    cart: [],
    lastItem: 'None',
    expectedWeight: 0,
    measuredWeight: 0,
    locked: false,
    alert: null,
    startedAt: 'Idle at Dock #2',
  },
  {
    id: 'TRL-DEL-105',
    battery: 82,
    status: 'verified',
    customer: { name: 'Neha Gupta', phone: '+91 98765 43213', id: 'CUST-002' },
    cart: [
      { id: 'PRD-01', name: 'Fresh Royal Gala Apples (1kg)', qty: 2, price: 180, weight: 1000 },
      { id: 'PRD-05', name: 'Cadbury Dairy Milk Silk (150g)', qty: 2, price: 175, weight: 160 },
      { id: 'PRD-03', name: 'Amul Taaza Toned Milk (1L)', qty: 3, price: 56, weight: 1030 },
    ],
    lastItem: 'Amul Taaza Toned Milk (1L)',
    expectedWeight: 5410,
    measuredWeight: 5410,
    locked: false,
    alert: null,
    startedAt: '24 mins ago',
  },
  {
    id: 'TRL-DEL-106',
    battery: 100,
    status: 'idle',
    customer: null,
    cart: [],
    lastItem: 'None',
    expectedWeight: 0,
    measuredWeight: 0,
    locked: false,
    alert: null,
    startedAt: 'Ready for Shopper',
  },
];

const INITIAL_ORDERS = [
  { id: '#ORD-9101', trolleyId: 'TRL-DEL-108', customer: 'Vikash Verma', phone: '+91 98765 43214', date: 'Just now', itemsCount: 4, amount: 620, paymentMode: 'UPI (QR Scan)', status: 'Completed', verified: true },
  { id: '#ORD-9100', trolleyId: 'TRL-DEL-105', customer: 'Ananya Roy', phone: '+91 98765 43215', date: '8 mins ago', itemsCount: 7, amount: 1450, paymentMode: 'Smart Cart Pay', status: 'Completed', verified: true },
  { id: '#ORD-9099', trolleyId: 'TRL-DEL-101', customer: 'Rahul Deshmukh', phone: '+91 98765 43216', date: '19 mins ago', itemsCount: 3, amount: 380, paymentMode: 'Debit Card', status: 'Completed', verified: true },
  { id: '#ORD-9098', trolleyId: 'TRL-DEL-103', customer: 'Deepak Chopra', phone: '+91 98765 43217', date: '42 mins ago', itemsCount: 9, amount: 2190, paymentMode: 'UPI (GPay)', status: 'Completed', verified: true },
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('raise_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [trolleys, setTrolleys] = useState(() => {
    const saved = localStorage.getItem('raise_trolleys');
    return saved ? JSON.parse(saved) : INITIAL_TROLLEYS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('raise_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [selectedTrolleyId, setSelectedTrolleyId] = useState('TRL-DEL-101');
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState('Checking...');

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', title: 'Weight Mismatch Flagged', message: 'Trolley TRL-DEL-102 detected +300g unexpected weight.', time: '5m ago', read: false },
    { id: 2, type: 'success', title: 'Smart Checkout Completed', message: 'Vikash Verma completed cashierless checkout for ₹620 via TRL-DEL-108.', time: '12m ago', read: false },
    { id: 3, type: 'warning', title: 'Low Stock Alert', message: 'Farm Fresh Bananas & Wheat Bread are running low on shelf stock.', time: '25m ago', read: true },
  ]);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('raise_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('raise_trolleys', JSON.stringify(trolleys));
  }, [trolleys]);

  useEffect(() => {
    localStorage.setItem('raise_orders', JSON.stringify(orders));
  }, [orders]);

  // Check Supabase connection on load
  useEffect(() => {
    const checkSupabase = async () => {
      const config = getSupabaseConfig();
      if (!config.isConfigured) {
        setSupabaseConnected(false);
        setSupabaseStatusMsg('Not configured (Running in fast Local/Demo mode)');
        return;
      }
      const client = getSupabaseClient();
      if (!client) {
        setSupabaseConnected(false);
        setSupabaseStatusMsg('Config invalid');
        return;
      }
      try {
        const { error } = await client.from('products').select('count', { count: 'exact', head: true });
        if (!error || error.code === '42P01') {
          setSupabaseConnected(true);
          setSupabaseStatusMsg('Connected to Supabase');
        } else {
          setSupabaseConnected(false);
          setSupabaseStatusMsg(`Error: ${error.message}`);
        }
      } catch (e) {
        setSupabaseConnected(false);
        setSupabaseStatusMsg('Connection failed');
      }
    };
    checkSupabase();
  }, []);

  // Product Actions
  const addProduct = (newProd) => {
    const product = {
      ...newProd,
      id: newProd.id || `PRD-${String(products.length + 1).padStart(2, '0')}`,
      stock: Number(newProd.stock) || 0,
      price: Number(newProd.price) || 0,
      weight_grams: Number(newProd.weight_grams) || 100,
      status: Number(newProd.stock) === 0 ? 'Out of Stock' : Number(newProd.stock) < 15 ? 'Low Stock' : 'In Stock'
    };
    setProducts(prev => [product, ...prev]);
    addNotification({
      type: 'info',
      title: 'New Product Added',
      message: `${product.name} (₹${product.price}) added to inventory.`,
      time: 'Just now'
    });
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updatedFields };
        updated.status = Number(updated.stock) === 0 ? 'Out of Stock' : Number(updated.stock) < 15 ? 'Low Stock' : 'In Stock';
        return updated;
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Trolley & Cart Telemetry Actions
  const resolveTrolleyAlert = (trolleyId) => {
    setTrolleys(prev => prev.map(t => {
      if (t.id === trolleyId) {
        return {
          ...t,
          status: 'verified',
          alert: null,
          locked: false,
          measuredWeight: t.expectedWeight, // recalibrate scale
        };
      }
      return t;
    }));
    addNotification({
      type: 'success',
      title: 'Security Alert Cleared',
      message: `Trolley ${trolleyId} weight scale verified & re-calibrated. Cart wheels unlocked.`,
      time: 'Just now'
    });
  };

  const lockTrolleyWheels = (trolleyId) => {
    setTrolleys(prev => prev.map(t => {
      if (t.id === trolleyId) {
        return { ...t, locked: !t.locked };
      }
      return t;
    }));
  };

  const scanItemToTrolley = (trolleyId, productId, simulateWeightMismatch = false) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setTrolleys(prev => prev.map(t => {
      if (t.id !== trolleyId) return t;

      const existingItemIndex = t.cart.findIndex(i => i.id === product.id);
      let newCart = [...t.cart];
      if (existingItemIndex >= 0) {
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          qty: newCart[existingItemIndex].qty + 1
        };
      } else {
        newCart.push({
          id: product.id,
          name: product.name,
          qty: 1,
          price: product.price,
          weight: product.weight_grams
        });
      }

      const newExpectedWeight = t.expectedWeight + product.weight_grams;
      const extraWeight = simulateWeightMismatch ? 350 : 0;
      const newMeasuredWeight = newExpectedWeight + extraWeight;
      const isMismatch = extraWeight > 0;

      return {
        ...t,
        cart: newCart,
        lastItem: product.name,
        expectedWeight: newExpectedWeight,
        measuredWeight: newMeasuredWeight,
        status: isMismatch ? 'mismatch' : 'verified',
        locked: isMismatch ? true : t.locked,
        alert: isMismatch ? `Weight Mismatch: +${extraWeight}g unexpected weight detected on ${product.name} scan!` : t.alert,
        startedAt: t.startedAt.includes('Idle') || t.startedAt.includes('Ready') ? 'Started just now' : t.startedAt,
      };
    }));

    addNotification({
      type: simulateWeightMismatch ? 'alert' : 'info',
      title: simulateWeightMismatch ? `⚠️ Weight Mismatch on ${trolleyId}` : `Item Scanned on ${trolleyId}`,
      message: simulateWeightMismatch 
        ? `${product.name} scanned but scale measured +350g discrepancy!` 
        : `${product.name} (₹${product.price}) verified and added to cart.`,
      time: 'Just now'
    });
  };

  const removeItemFromTrolley = (trolleyId, productId) => {
    setTrolleys(prev => prev.map(t => {
      if (t.id !== trolleyId) return t;
      const item = t.cart.find(i => i.id === productId);
      if (!item) return t;

      let newCart;
      if (item.qty > 1) {
        newCart = t.cart.map(i => i.id === productId ? { ...i, qty: i.qty - 1 } : i);
      } else {
        newCart = t.cart.filter(i => i.id !== productId);
      }

      const newExpectedWeight = Math.max(0, t.expectedWeight - item.weight);
      const newMeasuredWeight = Math.max(0, t.measuredWeight - item.weight);

      return {
        ...t,
        cart: newCart,
        lastItem: `Removed ${item.name}`,
        expectedWeight: newExpectedWeight,
        measuredWeight: newMeasuredWeight,
        status: 'verified',
        alert: null,
        locked: false
      };
    }));
  };

  const checkoutTrolley = (trolleyId, paymentMode = 'UPI (QR Code)') => {
    const trolley = trolleys.find(t => t.id === trolleyId);
    if (!trolley || trolley.cart.length === 0) return null;

    const totalAmount = trolley.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemsCount = trolley.cart.reduce((sum, item) => sum + item.qty, 0);

    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      trolleyId: trolley.id,
      customer: trolley.customer?.name || 'Walk-in Shopper',
      phone: trolley.customer?.phone || '+91 98000 00000',
      date: 'Just now',
      itemsCount,
      amount: totalAmount,
      paymentMode,
      status: 'Completed',
      verified: true,
      items: [...trolley.cart]
    };

    // Add to orders
    setOrders(prev => [newOrder, ...prev]);

    // Reset Trolley
    setTrolleys(prev => prev.map(t => {
      if (t.id === trolleyId) {
        return {
          ...t,
          cart: [],
          status: 'idle',
          lastItem: 'Checkout Complete',
          expectedWeight: 0,
          measuredWeight: 0,
          locked: false,
          alert: null,
          startedAt: 'Ready for next customer'
        };
      }
      return t;
    }));

    addNotification({
      type: 'success',
      title: 'Payment Received',
      message: `${newOrder.customer} checked out ₹${totalAmount} via ${paymentMode}. Trolley ${trolleyId} cleared!`,
      time: 'Just now'
    });

    return newOrder;
  };

  const addNotification = (n) => {
    setNotifications(prev => [{ id: Date.now(), read: false, ...n }, ...prev.slice(0, 19)]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Aggregated Stats
  const activeTrolleysCount = trolleys.filter(t => t.cart.length > 0 || t.status === 'verified' || t.status === 'mismatch').length;
  const mismatchCount = trolleys.filter(t => t.status === 'mismatch').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const liveInStoreCartValue = trolleys.reduce((sum, t) => {
    const tVal = t.cart.reduce((cSum, item) => cSum + (item.price * item.qty), 0);
    return sum + tVal;
  }, 0);

  return (
    <StoreContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      trolleys,
      selectedTrolleyId,
      setSelectedTrolleyId,
      resolveTrolleyAlert,
      lockTrolleyWheels,
      scanItemToTrolley,
      removeItemFromTrolley,
      checkoutTrolley,
      orders,
      isStoreOnline,
      setIsStoreOnline,
      notifications,
      addNotification,
      markAllNotificationsRead,
      supabaseConnected,
      setSupabaseConnected,
      supabaseStatusMsg,
      setSupabaseStatusMsg,
      activeTrolleysCount,
      mismatchCount,
      totalRevenue,
      liveInStoreCartValue
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
