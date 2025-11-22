import React, { useState } from 'react';
import { 
  Package, Plus, Search, Filter, Edit, Trash2, 
  MoreVertical, ArrowUpDown, X, Save, AlertCircle
} from 'lucide-react';

export default function ProductsManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Steel Rods', sku: 'SR-001', category: 'Raw Materials', stock: 450, unit: 'kg', minStock: 100, status: 'In Stock' },
    { id: 2, name: 'Office Chairs', sku: 'OC-002', category: 'Furniture', stock: 45, unit: 'units', minStock: 20, status: 'In Stock' },
    { id: 3, name: 'Paint Cans', sku: 'PC-003', category: 'Supplies', stock: 15, unit: 'cans', minStock: 50, status: 'Low Stock' },
    { id: 4, name: 'Laptops', sku: 'LP-004', category: 'Electronics', stock: 0, unit: 'units', minStock: 5, status: 'Out of Stock' },
    { id: 5, name: 'Wooden Planks', sku: 'WP-005', category: 'Raw Materials', stock: 320, unit: 'pieces', minStock: 100, status: 'In Stock' }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    stock: '',
    unit: '',
    minStock: ''
  });

  const categories = ['All Categories', 'Raw Materials', 'Furniture', 'Supplies', 'Electronics'];

  const getStatusColor = (status) => {
    if (status === 'In Stock') return 'bg-green-100 text-green-700';
    if (status === 'Low Stock') return 'bg-amber-100 text-amber-700';
    if (status === 'Out of Stock') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const handleAddProduct = () => {
    const product = {
      id: products.length + 1,
      ...newProduct,
      stock: parseInt(newProduct.stock),
      minStock: parseInt(newProduct.minStock),
      status: parseInt(newProduct.stock) === 0 ? 'Out of Stock' : 
              parseInt(newProduct.stock) <= parseInt(newProduct.minStock) ? 'Low Stock' : 'In Stock'
    };
    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({ name: '', sku: '', category: '', stock: '', unit: '', minStock: '' });
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products Management</h1>
        <p className="text-gray-600">Manage your product inventory and stock levels</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="all">All Categories</option>
              <option value="Raw Materials">Raw Materials</option>
              <option value="Furniture">Furniture</option>
              <option value="Supplies">Supplies</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">In Stock</p>
          <p className="text-2xl font-bold text-green-600">{products.filter(p => p.status === 'In Stock').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Low Stock</p>
          <p className="text-2xl font-bold text-amber-600">{products.filter(p => p.status === 'Low Stock').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{products.filter(p => p.status === 'Out of Stock').length}</p>
        </div>
      </div>

      {/* Products Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">SKU</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unit</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">{product.stock}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.unit}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.sku}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium text-gray-900">{product.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Stock</p>
                <p className="font-medium text-gray-900">{product.stock} {product.unit}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU / Code</label>
                  <input
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., SR-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select category</option>
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit of Measure</label>
                  <input
                    type="text"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., kg, units, pieces"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stock Level</label>
                  <input
                    type="number"
                    value={newProduct.minStock}
                    onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}