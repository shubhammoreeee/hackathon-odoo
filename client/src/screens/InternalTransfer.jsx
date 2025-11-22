import React, { useState } from 'react';
import { 
  ArrowRightLeft, Plus, Search, Calendar, MapPin, 
  Check, X, ArrowRight, Package
} from 'lucide-react';

export default function InternalTransfers() {
  const [transfers, setTransfers] = useState([
    { 
      id: 'TRF-001', 
      from: 'Main Warehouse', 
      to: 'Production Floor',
      date: '2024-11-20', 
      items: 2, 
      totalQty: 100, 
      status: 'Done',
      products: [
        { name: 'Steel Rods', qty: 50, unit: 'kg' },
        { name: 'Bolts', qty: 50, unit: 'pieces' }
      ]
    },
    { 
      id: 'TRF-002', 
      from: 'Warehouse A', 
      to: 'Warehouse B',
      date: '2024-11-21', 
      items: 1, 
      totalQty: 30, 
      status: 'Waiting',
      products: [
        { name: 'Paint Cans', qty: 30, unit: 'cans' }
      ]
    },
    { 
      id: 'TRF-003', 
      from: 'Production Floor', 
      to: 'Quality Check Area',
      date: '2024-11-22', 
      items: 3, 
      totalQty: 75, 
      status: 'Ready',
      products: [
        { name: 'Finished Frames', qty: 25, unit: 'units' },
        { name: 'Assembled Parts', qty: 30, unit: 'units' },
        { name: 'Components', qty: 20, unit: 'units' }
      ]
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newTransfer, setNewTransfer] = useState({
    from: '',
    to: '',
    date: '',
    reason: '',
    products: [{ name: '', qty: '', unit: '' }]
  });

  const locations = [
    'Main Warehouse',
    'Warehouse A',
    'Warehouse B',
    'Production Floor',
    'Quality Check Area',
    'Rack A',
    'Rack B',
    'Storage Room 1',
    'Storage Room 2'
  ];

  const getStatusColor = (status) => {
    if (status === 'Done') return 'bg-green-100 text-green-700';
    if (status === 'Ready') return 'bg-blue-100 text-blue-700';
    if (status === 'Waiting') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };

  const addProductLine = () => {
    setNewTransfer({
      ...newTransfer,
      products: [...newTransfer.products, { name: '', qty: '', unit: '' }]
    });
  };

  const updateProductLine = (index, field, value) => {
    const updatedProducts = [...newTransfer.products];
    updatedProducts[index][field] = value;
    setNewTransfer({ ...newTransfer, products: updatedProducts });
  };

  const removeProductLine = (index) => {
    const updatedProducts = newTransfer.products.filter((_, i) => i !== index);
    setNewTransfer({ ...newTransfer, products: updatedProducts });
  };

  const handleCreateTransfer = () => {
    const totalQty = newTransfer.products.reduce((sum, p) => sum + parseInt(p.qty || 0), 0);
    const transfer = {
      id: `TRF-${String(transfers.length + 1).padStart(3, '0')}`,
      from: newTransfer.from,
      to: newTransfer.to,
      date: newTransfer.date,
      items: newTransfer.products.length,
      totalQty: totalQty,
      status: 'Waiting',
      products: newTransfer.products
    };
    setTransfers([...transfers, transfer]);
    setShowCreateModal(false);
    setNewTransfer({ from: '', to: '', date: '', reason: '', products: [{ name: '', qty: '', unit: '' }] });
  };

  const filteredTransfers = transfers.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.to.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Internal Transfers</h1>
        <p className="text-gray-600">Move stock between locations within your organization</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="Waiting">Waiting</option>
              <option value="Ready">Ready</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Transfer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Total Transfers</p>
          <p className="text-2xl font-bold text-gray-900">{transfers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{transfers.filter(t => t.status === 'Done').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Ready</p>
          <p className="text-2xl font-bold text-blue-600">{transfers.filter(t => t.status === 'Ready').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Waiting</p>
          <p className="text-2xl font-bold text-amber-600">{transfers.filter(t => t.status === 'Waiting').length}</p>
        </div>
      </div>

      {/* Transfer Flow Visualization */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How Internal Transfers Work</h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mb-2">
                <MapPin className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Source</p>
              <p className="text-xs text-gray-500">Location A</p>
            </div>
            <ArrowRight className="w-8 h-8 text-indigo-600" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mb-2">
                <ArrowRightLeft className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Transfer</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-600" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mb-2">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Destination</p>
              <p className="text-xs text-gray-500">Location B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transfers List */}
      <div className="space-y-4">
        {filteredTransfers.map((transfer) => (
          <div key={transfer.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ArrowRightLeft className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{transfer.id}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </div>
                  
                  {/* Transfer Route */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-900">{transfer.from}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">{transfer.to}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(transfer.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span>{transfer.items} items • {transfer.totalQty} units</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 lg:flex-col">
                <button 
                  onClick={() => {
                    setSelectedTransfer(transfer);
                    setShowViewModal(true);
                  }}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-medium">View Details</span>
                </button>
                {transfer.status === 'Waiting' && (
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Process</span>
                  </button>
                )}
                {transfer.status === 'Ready' && (
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Complete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Transfer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Create Internal Transfer</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Transfer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Location</label>
                  <select
                    value={newTransfer.from}
                    onChange={(e) => setNewTransfer({...newTransfer, from: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select source location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Location</label>
                  <select
                    value={newTransfer.to}
                    onChange={(e) => setNewTransfer({...newTransfer, to: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select destination location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Date</label>
                  <input
                    type="date"
                    value={newTransfer.date}
                    onChange={(e) => setNewTransfer({...newTransfer, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason / Notes</label>
                  <input
                    type="text"
                    value={newTransfer.reason}
                    onChange={(e) => setNewTransfer({...newTransfer, reason: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Products Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Products to Transfer</h3>
                  <button
                    onClick={addProductLine}
                    className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
                <div className="space-y-3">
                  {newTransfer.products.map((product, index) => (
                    <div key={index} className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProductLine(index, 'name', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Product name"
                        />
                        <input
                          type="number"
                          value={product.qty}
                          onChange={(e) => updateProductLine(index, 'qty', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Quantity"
                        />
                        <input
                          type="text"
                          value={product.unit}
                          onChange={(e) => updateProductLine(index, 'unit', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Unit"
                        />
                      </div>
                      {newTransfer.products.length > 1 && (
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
                  onClick={handleCreateTransfer}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Create Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Transfer Modal */}
      {showViewModal && selectedTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Transfer Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transfer ID</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedTransfer.status)}`}>
                    {selectedTransfer.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">From Location</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">To Location</p>
                  <p className="font-semibold text-gray-900">{selectedTransfer.to}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedTransfer.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Products</h3>
                <div className="space-y-2">
                  {selectedTransfer.products.map((product, idx) => (
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