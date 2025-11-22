import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Calendar, Package2, MapPin,
  Check, X, ChevronRight, AlertCircle
} from 'lucide-react';

export default function DeliveryOrders() {
  const [deliveries, setDeliveries] = useState([
    { 
      id: 'DEL-001', 
      customer: 'ABC Construction', 
      date: '2024-11-20', 
      destination: 'Site A, Mumbai',
      items: 2, 
      totalQty: 30, 
      status: 'Done',
      products: [
        { name: 'Steel Rods', qty: 20, unit: 'kg' },
        { name: 'Cement Bags', qty: 10, unit: 'bags' }
      ]
    },
    { 
      id: 'DEL-002', 
      customer: 'Office Depot', 
      date: '2024-11-21', 
      destination: 'Warehouse B, Delhi',
      items: 1, 
      totalQty: 10, 
      status: 'Ready',
      products: [
        { name: 'Office Chairs', qty: 10, unit: 'units' }
      ]
    },
    { 
      id: 'DEL-003', 
      customer: 'Tech Solutions Inc', 
      date: '2024-11-22', 
      destination: 'Office, Bangalore',
      items: 3, 
      totalQty: 25, 
      status: 'Waiting',
      products: [
        { name: 'Laptops', qty: 15, unit: 'units' },
        { name: 'Monitors', qty: 8, unit: 'units' },
        { name: 'Keyboards', qty: 2, unit: 'units' }
      ]
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentStep, setCurrentStep] = useState(1);

  const [newDelivery, setNewDelivery] = useState({
    customer: '',
    date: '',
    destination: '',
    warehouse: '',
    products: [{ name: '', qty: '', unit: '' }]
  });

  const getStatusColor = (status) => {
    if (status === 'Done') return 'bg-green-100 text-green-700';
    if (status === 'Ready') return 'bg-blue-100 text-blue-700';
    if (status === 'Waiting') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getStepColor = (step) => {
    if (step < currentStep) return 'bg-green-500 border-green-500';
    if (step === currentStep) return 'bg-purple-500 border-purple-500';
    return 'bg-gray-200 border-gray-300';
  };

  const addProductLine = () => {
    setNewDelivery({
      ...newDelivery,
      products: [...newDelivery.products, { name: '', qty: '', unit: '' }]
    });
  };

  const updateProductLine = (index, field, value) => {
    const updatedProducts = [...newDelivery.products];
    updatedProducts[index][field] = value;
    setNewDelivery({ ...newDelivery, products: updatedProducts });
  };

  const removeProductLine = (index) => {
    const updatedProducts = newDelivery.products.filter((_, i) => i !== index);
    setNewDelivery({ ...newDelivery, products: updatedProducts });
  };

  const handleCreateDelivery = () => {
    const totalQty = newDelivery.products.reduce((sum, p) => sum + parseInt(p.qty || 0), 0);
    const delivery = {
      id: `DEL-${String(deliveries.length + 1).padStart(3, '0')}`,
      customer: newDelivery.customer,
      date: newDelivery.date,
      destination: newDelivery.destination,
      items: newDelivery.products.length,
      totalQty: totalQty,
      status: 'Waiting',
      products: newDelivery.products
    };
    setDeliveries([...deliveries, delivery]);
    setShowCreateModal(false);
    setCurrentStep(1);
    setNewDelivery({ customer: '', date: '', destination: '', warehouse: '', products: [{ name: '', qty: '', unit: '' }] });
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = d.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         d.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const steps = [
    { num: 1, name: 'Pick Items', desc: 'Select products' },
    { num: 2, name: 'Pack Items', desc: 'Prepare for shipping' },
    { num: 3, name: 'Validate', desc: 'Complete delivery' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Orders</h1>
        <p className="text-gray-600">Manage outgoing stock deliveries to customers</p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="Waiting">Waiting</option>
              <option value="Ready">Ready</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Delivery
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Total Deliveries</p>
          <p className="text-2xl font-bold text-gray-900">{deliveries.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{deliveries.filter(d => d.status === 'Done').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Ready to Ship</p>
          <p className="text-2xl font-bold text-blue-600">{deliveries.filter(d => d.status === 'Ready').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Waiting</p>
          <p className="text-2xl font-bold text-amber-600">{deliveries.filter(d => d.status === 'Waiting').length}</p>
        </div>
      </div>

      {/* Delivery Process Flow */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Process Flow</h3>
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full ${getStepColor(step.num)} border-4 flex items-center justify-center text-white font-bold mb-2 transition-all`}>
                  {step.num < currentStep ? <Check className="w-6 h-6" /> : step.num}
                </div>
                <p className="font-medium text-gray-900 text-sm text-center">{step.name}</p>
                <p className="text-xs text-gray-500 text-center hidden sm:block">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${step.num < currentStep ? 'bg-green-500' : 'bg-gray-300'} transition-all`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{delivery.id}</h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package2 className="w-4 h-4" />
                      <span className="font-medium">{delivery.customer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{delivery.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(delivery.date).toLocaleDateString()} • {delivery.items} items • {delivery.totalQty} units</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 lg:flex-col lg:items-end">
                <button 
                  onClick={() => {
                    setSelectedDelivery(delivery);
                    setShowViewModal(true);
                  }}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">View Details</span>
                </button>
                {delivery.status === 'Waiting' && (
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors">
                    <Package2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Pick Items</span>
                  </button>
                )}
                {delivery.status === 'Ready' && (
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Validate</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Delivery Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Create New Delivery Order</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={newDelivery.customer}
                    onChange={(e) => setNewDelivery({...newDelivery, customer: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
                  <input
                    type="date"
                    value={newDelivery.date}
                    onChange={(e) => setNewDelivery({...newDelivery, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <input
                    type="text"
                    value={newDelivery.destination}
                    onChange={(e) => setNewDelivery({...newDelivery, destination: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter delivery address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source Warehouse</label>
                  <select
                    value={newDelivery.warehouse}
                    onChange={(e) => setNewDelivery({...newDelivery, warehouse: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
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
                  <h3 className="text-lg font-semibold text-gray-900">Products to Deliver</h3>
                  <button
                    onClick={addProductLine}
                    className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
                <div className="space-y-3">
                  {newDelivery.products.map((product, index) => (
                    <div key={index} className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProductLine(index, 'name', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Product name"
                        />
                        <input
                          type="number"
                          value={product.qty}
                          onChange={(e) => updateProductLine(index, 'qty', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Quantity"
                        />
                        <input
                          type="text"
                          value={product.unit}
                          onChange={(e) => updateProductLine(index, 'unit', e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Unit"
                        />
                      </div>
                      {newDelivery.products.length > 1 && (
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
                  onClick={handleCreateDelivery}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Create Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Delivery Modal */}
      {showViewModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Delivery Order Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedDelivery.status)}`}>
                    {selectedDelivery.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedDelivery.date).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Destination</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.destination}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Products</h3>
                <div className="space-y-2">
                  {selectedDelivery.products.map((product, idx) => (
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