import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      {/* Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header Component */}
        <TopHeader />
        
        {/* Dashboard Pages */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
             <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-300 rounded-2xl mt-10">
               <h2 className="text-2xl font-bold text-slate-400">Dashboard Area Ready</h2>
               <p className="text-slate-500 mt-2">Next step: Adding Zepto/Blinkit Graphs & Cards here</p>
             </div>
          )}
          
          {activeTab !== 'dashboard' && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <span className="text-4xl mb-2">🚧</span>
              <p className="font-bold text-slate-500 uppercase tracking-wider">{activeTab} Module</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;