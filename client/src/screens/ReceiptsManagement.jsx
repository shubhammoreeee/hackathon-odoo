import React, { useState } from 'react';
import { 
  Truck, Plus, Search, Calendar, Check, X, 
  Edit, Eye, Package, Building, ChevronRight
} from 'lucide-react';

export default function ReceiptsManagement() {
  const [receipts, setReceipts] = useState([
    { 
      id: 'RCP-001', 
      supplier: 'Steel Corp Ltd', 
      date: '2024-11-20', 
      items: 3, 
      totalQty: 150, 
      status: 'Done',
      products: [
        { name: 'Steel Rods', qty: 50, unit: 'kg' },
        { name: 'Steel Sheets', qty: 80, unit: 'kg' },
        { name: 'Steel Pipes', qty: 20, unit: 'units' }
      ]
    },
    { 
      id: 'RCP-002', 
      supplier: 'Office Supplies Co', 
      date: '2024-11-21', 
      items: 2, 
      totalQty: 75, 
      status: 'Waiting',
      products: [
        { name: 'Office Chairs', qty: 25, unit: 'units' },
        { name: 'Desks', qty: 50, unit: 'units' }
      ]
    },
    { 
      id: 'RCP-003', 
      supplier: 'Paint Warehouse', 
      date: '2024-11-22', 
      items: 1, 
      totalQty: 100, 
      status: 'Draft',
      products: [
        { name: 'Paint Cans', qty: 100, unit: 'cans' }
      ]
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newReceipt, setNewReceipt] = useState({
    supplier: '',
    date: '',
    warehouse: '',
    products: [{ name: '', qty: '', unit: '' }]
  });

  const getStatusColor = (status) => {
    if (status === 'Done') return 'bg-green-100 text-green-700';
    if (status === 'Waiting') return 'bg-amber-100 text-amber-700';
    if (status === 'Draft') return 'bg-gray-100 text-gray-700';
    return 'bg-blue-100 text-blue-700';
  };

  const addProductLine = () => {
    setNewReceipt({
      ...newReceipt,
      products: [...newReceipt.products, { name: '', qty: '', unit: '' }]
    });
  };

  const updateProductLine = (index, field, value) => {
    const updatedProducts = [...newReceipt.products];
    updatedProducts[index][field] = value;
    setNewReceipt({ ...newReceipt, products: updatedProducts });
  };

  const removeProductLine = (index) => {
    const updatedProducts = newReceipt.products.filter((_, i) => i !== index);
    setNewReceipt({ ...newReceipt, products: updatedProducts });
  };

  const handleCreateReceipt = () => {
    const totalQty = newReceipt.products.reduce((sum, p) => sum + parseInt(p.qty || 0), 0);
    const receipt = {
      id: `RCP-${String(receipts.length + 1).padStart(3, '0')}`,
      supplier: newReceipt.supplier,
      date: newReceipt.date,
      items: newReceipt.products.length,
      totalQty: totalQty,
      status: 'Draft',
      products: newReceipt.products
    };
    setReceipts([...receipts, receipt]);
    setShowCreateModal(false);
    setNewReceipt({ supplier: '', date: '', warehouse: '', products: [{ name: '', qty: '', unit: '' }] });
  };

  const filteredReceipts = receipts.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipts Management</h1>
        <p className="text-gray-600">Manage incoming stock from suppliers</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by receipt ID or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Waiting">Waiting</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Receipt
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Total Receipts</p>
          <p className="text-2xl font-bold text-gray-900">{receipts.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{receipts.filter(r => r.status === 'Done').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Waiting</p>
          <p className="text-2xl font-bold text-amber-600">{receipts.filter(r => r.status === 'Waiting').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Draft</p>
          <p className="text-2xl font-bold text-gray-600">{receipts.filter(r => r.status === 'Draft').length}</p>
        </div>
      </div>

      {/* Receipts List */}
      <div className="space-y-4">
        {filteredReceipts.map((receipt) => (
          <div key={receipt.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{receipt.id}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(receipt.status)}`}>
                      {receipt.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>{receipt.supplier}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(receipt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package className="w-4 h-4" />
                      <span>{receipt.items} items • {receipt.totalQty} units total</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 lg:flex-col lg:items-end">
                <button 
                  onClick={() => {
                    setSelectedReceipt(receipt);
                    setShowViewModal(true);
                  }}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View</span>
                </button>
                {receipt.status === 'Draft' && (
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Validate</span>
                  </button>
                )}
                {receipt.status === 'Waiting' && (
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Receive</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Receipt Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Create New Receipt</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Receipt Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
                  <input
                    type="text"
                    value={newReceipt.supplier}
                    onChange={(e) => setNewReceipt({...newReceipt, supplier: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="Enter supplier name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Date</label>
                  <input
                    type="date"
                    value={newReceipt.date}
                    onChange={(e) => setNewReceipt({...newReceipt, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse</label>
                  <select
                    value={newReceipt.warehouse}
                    onChange={(e) => setNewReceipt({...newReceipt, warehouse: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select warehouse</option>
                    <option value="main">Main Warehouse</option>
                    <option value="secondary">Secondary Warehouse</option>
                  </select>
                </div>
              </div>

              {/* Products Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                  <button
                    onClick={addProductLine}
                    className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
                <div className="space-y-3">
                  {newReceipt.products.map((product, index) => (
                    <div key={index} className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProductLine(index, 'name', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="Product name"
                        />
                        <input
                          type="number"
                          value={product.qty}
                          onChange={(e) => updateProductLine(index, 'qty', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="Quantity"
                        />
                        <input
                          type="text"
                          value={product.unit}
                          onChange={(e) => updateProductLine(index, 'unit', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="Unit (kg, units)"
                        />
                      </div>
                      {newReceipt.products.length > 1 && (
                        <button
                          onClick={() => removeProductLine(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateReceipt}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Create Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Receipt Modal */}
      {showViewModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Receipt Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Receipt ID</p>
                  <p className="font-semibold text-gray-900">{selectedReceipt.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedReceipt.status)}`}>
                    {selectedReceipt.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Supplier</p>
                  <p className="font-semibold text-gray-900">{selectedReceipt.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedReceipt.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Products</h3>
                <div className="space-y-2">
                  {selectedReceipt.products.map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="text-gray-600">{product.qty} {product.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}