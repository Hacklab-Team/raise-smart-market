import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Products() {
  // डमी इन्वेंट्री डेटा
  const [products, setProducts] = useState([
    { id: '#PRD-01', name: 'Fresh Red Apple', category: 'Fruits', price: '₹120', stock: 145, status: 'In Stock' },
    { id: '#PRD-02', name: 'Farm Fresh Bananas', category: 'Fruits', price: '₹60', stock: 12, status: 'Low Stock' },
    { id: '#PRD-03', name: 'Organic Potatoes', category: 'Vegetables', price: '₹40', stock: 0, status: 'Out of Stock' },
    { id: '#PRD-04', name: 'Amul Toned Milk', category: 'Dairy', price: '₹32', stock: 85, status: 'In Stock' },
    { id: '#PRD-05', name: 'Britannia Brown Bread', category: 'Snacks', price: '₹45', stock: 8, status: 'Low Stock' },
    { id: '#PRD-06', name: 'Farm Eggs (12 Pcs)', category: 'Dairy', price: '₹85', stock: 34, status: 'In Stock' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Header & Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Inventory Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your store's products, pricing, and stock levels.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-blue-200 transition-all flex items-center gap-2 active:scale-95">
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* Zepto Style Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <span className="text-xl font-black">247</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Total Products</p>
            <p className="text-xs text-slate-400 mt-0.5">Across 12 categories</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-l-4 border-l-yellow-500">
          <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Low Stock Alerts</p>
            <p className="text-lg font-black text-slate-800 leading-tight">18 Items</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
            <span className="text-xl font-black">5</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Out of Stock</p>
            <p className="text-xs text-red-500 font-medium mt-0.5">Needs immediate restock</p>
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products by name or ID..." 
              className="w-full bg-white border border-slate-200 py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 w-full md:w-auto justify-center">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {products.map((product, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{product.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{product.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-bold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-700">{product.price}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold w-fit
                      ${product.status === 'In Stock' ? 'bg-green-100 text-green-700' : 
                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'}`}
                    >
                      {product.status === 'In Stock' && <CheckCircle2 size={14} />}
                      {product.status === 'Low Stock' && <AlertCircle size={14} />}
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition-colors"><Edit size={16} /></button>
                      <button className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}