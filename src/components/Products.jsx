import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Scale, 
  Barcode, 
  X,
  Sparkles,
  Boxes
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New product form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Snacks',
    price: '',
    weight_grams: '',
    stock: '',
    barcode: '',
    image: '📦'
  });

  const categories = ['All', 'Fruits', 'Dairy', 'Beverages', 'Snacks', 'Bakery', 'Staples'];

  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        p.barcode.includes(search) || 
                        p.id.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.weight_grams) {
      alert('Please fill in Name, Price, and Unit Weight!');
      return;
    }

    const newBarcode = formData.barcode || `890${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        weight_grams: Number(formData.weight_grams),
        stock: Number(formData.stock),
        barcode: newBarcode,
        image: formData.image
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        weight_grams: Number(formData.weight_grams),
        stock: Number(formData.stock) || 30,
        barcode: newBarcode,
        image: formData.image
      });
    }

    setShowAddModal(false);
    setFormData({ name: '', category: 'Snacks', price: '', weight_grams: '', stock: '', barcode: '', image: '📦' });
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      weight_grams: p.weight_grams,
      stock: p.stock,
      barcode: p.barcode,
      image: p.image || '📦'
    });
    setShowAddModal(true);
  };

  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 15).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Top Header & Action Button */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Smart Catalog & Weight Calibration</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Store catalog synchronized with Smart Trolley barcode scanners and precision weight sensors.
          </p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', category: 'Snacks', price: '', weight_grams: '', stock: '', barcode: '', image: '📦' });
            setShowAddModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus size={16} />
          Add New Product
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-4 border-l-4 border-l-blue-600">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Boxes size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Products</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{products.length} Items</p>
            <p className="text-[11px] text-slate-400">Calibrated for smart load cells</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-4 border-l-4 border-l-amber-500">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Low Stock Warnings</p>
            <p className="text-xl font-black text-amber-600 mt-0.5">{lowStockCount} Items</p>
            <p className="text-[11px] text-slate-400">Shelf quantity ≤ 15 units</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-4 border-l-4 border-l-rose-500">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Out of Stock</p>
            <p className="text-xl font-black text-rose-600 mt-0.5">{outOfStockCount} Items</p>
            <p className="text-[11px] text-rose-500 font-bold">Needs restock</p>
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        
        {/* Table Filters & Search */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-2.5 text-slate-400" size={17} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, barcode, or ID..." 
              className="w-full bg-white border border-slate-200 py-2 pl-10 pr-4 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/70 text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Item Details</th>
                <th className="px-6 py-4">Barcode / SKU</th>
                <th className="px-6 py-4">Scale Weight</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-slate-100 rounded-xl">{product.image || '📦'}</span>
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs">{product.name}</p>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600 font-bold">
                      <Barcode size={14} className="text-slate-400" />
                      <span>{product.barcode}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 flex items-center gap-1 w-fit">
                      <Scale size={12} className="text-blue-500" /> {product.weight_grams}g
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900">₹{product.price}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{product.stock} units</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 w-fit
                      ${product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 
                        product.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 
                        'bg-rose-100 text-rose-800'}`}
                    >
                      {product.status === 'In Stock' && <CheckCircle2 size={12} />}
                      {product.status === 'Low Stock' && <AlertCircle size={12} />}
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 rounded-xl transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete ${product.name}?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 p-2 rounded-xl transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {editingProduct ? 'Edit Product Calibration' : 'Add New Calibrated Product'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Organic Strawberries 250g"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Emoji Icon</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="e.g. 🍓"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="150"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Weight (Grams)</label>
                  <input
                    type="number"
                    value={formData.weight_grams}
                    onChange={(e) => setFormData({ ...formData, weight_grams: e.target.value })}
                    placeholder="250"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="40"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Barcode (EAN-13)</label>
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  placeholder="Auto-generated if left blank"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Add to Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}