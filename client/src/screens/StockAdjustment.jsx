import React, { useState } from 'react';
import { 
  ClipboardList, Plus, Search, AlertCircle, 
  TrendingUp, TrendingDown, Calendar, MapPin,
  Check, X, Package
} from 'lucide-react';

export default function StockAdjustments() {
  const [adjustments, setAdjustments] = useState([
    { 
      id: 'ADJ-001', 
      product: 'Steel Rods',
      location: 'Main Warehouse',
      date: '2024-11-20', 
      recorded: 450,
      counted: 447,
      difference: -3,
      reason: 'Damaged items',
      status: 'Done'
    },
    { 
      id: 'ADJ-002', 
      product: 'Office Chairs',
      location: 'Warehouse A',
      date: '2024-11-21', 
      recorded: 50,
      counted: 52,
      difference: 2,
      reason: 'Found in storage',
      status: 'Done'
    },
    { 
      id: 'ADJ-003', 
      product: 'Paint Cans',
      location: 'Storage Room 1',
      date: '2024-11-22', 
      recorded: 100,
      counted: 95,
      difference: -5,
      reason: 'Physical count mismatch',
      status: 'Pending'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [newAdjustment, setNewAdjustment] = useState({
    product: '',
    location: '',
    date: '',
    recorded: '',
    counted: '',
    reason: ''
  });

  const locations = [
    'Main Warehouse',
    'Warehouse A',
    'Warehouse B',
    'Production Floor',
    'Storage Room 1',
    'Storage Room 2'
  ];

  const getAdjustmentTypeColor = (diff) => {
    if (diff > 0) return 'text-green-600 bg-green-50';
    if (diff < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getStatusColor = (status) => {
    if (status === 'Done') return 'bg-green-100 text-green-700';
    if (status === 'Pending') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };

  const handleCreateAdjustment = () => {
    const recorded = parseInt(newAdjustment.recorded);
    const counted = parseInt(newAdjustment.counted);
    const difference = counted - recorded;
    
    const adjustment = {
      id: `ADJ-${String(adjustments.length + 1).padStart(3, '0')}`,
      product: newAdjustment.product,
      location: newAdjustment.location,
      date: newAdjustment.date,
      recorded: recorded,
      counted: counted,
      difference: difference,
      reason: newAdjustment.reason,
      status: 'Pending'
    };
    
    setAdjustments([...adjustments, adjustment]);
    setShowCreateModal(false);
    setNewAdjustment({ product: '', location: '', date: '', recorded: '', counted: '', reason: '' });
  };

  const filteredAdjustments = adjustments.filter(a => {
    const matchesSearch = a.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalIncrease = adjustments.filter(a => a.difference > 0).reduce((sum, a) => sum + a.difference, 0);
  const totalDecrease = adjustments.filter(a => a.difference < 0).reduce((sum, a) => sum + Math.abs(a.difference), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Adjustments</h1>
        <p className="text-gray-600">Fix mismatches between recorded and physical stock counts</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Adjustment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Total Adjustments</p>
          <p className="text-2xl font-bold text-gray-900">{adjustments.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Stock Increase</p>
          <p className="text-2xl font-bold text-green-600">+{totalIncrease}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Stock Decrease</p>
          <p className="text-2xl font-bold text-red-600">-{totalDecrease}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{adjustments.filter(a => a.status === 'Pending').length}</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">How Stock Adjustments Work</h3>
          <p className="text-sm text-blue-700">
            Stock adjustments reconcile differences between your system records and physical inventory counts. 
            Use this when you find discrepancies during cycle counts, discover damaged items, or identify missing stock.
          </p>
        </div>
      </div>

      {/* Adjustments List */}
      <div className="space-y-4">
        {filteredAdjustments.map((adjustment) => (
          <div key={adjustment.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  adjustment.difference > 0 ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                  adjustment.difference < 0 ? 'bg-gradient-to-br from-red-500 to-pink-500' :
                  'bg-gradient-to-br from-gray-500 to-gray-600'
                }`}>
                  <ClipboardList className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{adjustment.id}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(adjustment.status)}`}>
                      {adjustment.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{adjustment.product}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{adjustment.location}</span>
                      <span className="text-gray-400">•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(adjustment.date).toLocaleDateString()}</span>
                    </div>

                    {/* Adjustment Details */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Recorded:</span>
                        <span className="font-semibold text-gray-900">{adjustment.recorded}</span>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Counted:</span>
                        <span className="font-semibold text-gray-900">{adjustment.counted}</span>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold ${getAdjustmentTypeColor(adjustment.difference)}`}>
                        {adjustment.difference > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{adjustment.difference > 0 ? '+' : ''}{adjustment.difference}</span>
                      </div>
                    </div>

                    {adjustment.reason && (
                      <div className="mt-2 px-3 py-2 bg-amber-50 rounded-lg">
                        <p className="text-sm text-amber-800">
                          <span className="font-medium">Reason:</span> {adjustment.reason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 lg:flex-col">
                <button 
                  onClick={() => {
                    setSelectedAdjustment(adjustment);
                    setShowViewModal(true);
                  }}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-medium">Details</span>
                </button>
                {adjustment.status === 'Pending' && (
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Approve</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Adjustment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Create Stock Adjustment</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800">
                  Adjustments will automatically update your stock levels. Make sure your counted quantity is accurate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newAdjustment.product}
                    onChange={(e) => setNewAdjustment({...newAdjustment, product: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={newAdjustment.location}
                    onChange={(e) => setNewAdjustment({...newAdjustment, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adjustment Date</label>
                  <input
                    type="date"
                    value={newAdjustment.date}
                    onChange={(e) => setNewAdjustment({...newAdjustment, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recorded Quantity</label>
                  <input
                    type="number"
                    value={newAdjustment.recorded}
                    onChange={(e) => setNewAdjustment({...newAdjustment, recorded: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                    placeholder="System quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Counted Quantity</label>
                  <input
                    type="number"
                    value={newAdjustment.counted}
                    onChange={(e) => setNewAdjustment({...newAdjustment, counted: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                    placeholder="Physical count"
                  />
                </div>
              </div>

              {newAdjustment.recorded && newAdjustment.counted && (
                <div className={`p-4 rounded-xl ${getAdjustmentTypeColor(parseInt(newAdjustment.counted) - parseInt(newAdjustment.recorded))}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Difference:</span>
                    <span className="text-xl font-bold">
                      {parseInt(newAdjustment.counted) - parseInt(newAdjustment.recorded) > 0 ? '+' : ''}
                      {parseInt(newAdjustment.counted) - parseInt(newAdjustment.recorded)}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Adjustment</label>
                <textarea
                  value={newAdjustment.reason}
                  onChange={(e) => setNewAdjustment({...newAdjustment, reason: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                  placeholder="Explain why this adjustment is needed..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAdjustment}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Create Adjustment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Adjustment Modal */}
      {showViewModal && selectedAdjustment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Adjustment Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Adjustment ID</p>
                  <p className="font-semibold text-gray-900">{selectedAdjustment.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedAdjustment.status)}`}>
                    {selectedAdjustment.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Product</p>
                  <p className="font-semibold text-gray-900">{selectedAdjustment.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">{selectedAdjustment.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedAdjustment.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recorded Quantity:</span>
                  <span className="font-bold text-gray-900 text-lg">{selectedAdjustment.recorded}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Counted Quantity:</span>
                  <span className="font-bold text-gray-900 text-lg">{selectedAdjustment.counted}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Difference:</span>
                  <span className={`font-bold text-xl ${selectedAdjustment.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedAdjustment.difference > 0 ? '+' : ''}{selectedAdjustment.difference}
                  </span>
                </div>
              </div>

              {selectedAdjustment.reason && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Reason</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-900">{selectedAdjustment.reason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}