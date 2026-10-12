import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Dashboard from './components/Dashboard';
import TrolleyDashboard from './components/TrolleyDashboard';
import ClientDashboard from './components/ClientDashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Analytics from './components/Analytics';
import SupabaseIntegration from './components/SupabaseIntegration';
import Settings from './components/Settings';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans antialiased text-slate-800">
      {/* Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-72 flex flex-col min-h-screen">
        {/* Top Header Component */}
        <TopHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Dynamic Content Views */}
        <div className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'trolleys' && <TrolleyDashboard setActiveTab={setActiveTab} />}
          {activeTab === 'client' && <ClientDashboard setActiveTab={setActiveTab} />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'customers' && <Customers />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'supabase' && <SupabaseIntegration />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}

export default App;