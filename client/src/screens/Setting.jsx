import React, { useState } from 'react';
import { 
  Warehouse, Plus, Edit, Trash2, MapPin, Users, 
  Package, Settings, Bell, Lock, User, Mail, 
  Phone, Building, Globe, Save, X, Check
} from 'lucide-react';

export default function WarehousesSettings() {
  const [activeTab, setActiveTab] = useState('warehouses');
  const [warehouses, setWarehouses] = useState([
    { 
      id: 1, 
      name: 'Main Warehouse', 
      address: '123 Industrial Ave, Mumbai',
      manager: 'John Doe',
      capacity: 5000,
      occupied: 3500,
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Warehouse A', 
      address: '456 Storage Rd, Delhi',
      manager: 'Jane Smith',
      capacity: 3000,
      occupied: 2100,
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Warehouse B', 
      address: '789 Logistics Blvd, Bangalore',
      manager: 'Mike Johnson',
      capacity: 4000,
      occupied: 1500,
      status: 'Active'
    }
  ]);

  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [warehouseForm, setWarehouseForm] = useState({
    name: '',
    address: '',
    manager: '',
    capacity: ''
  });

  const [userSettings, setUserSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@stockmaster.com',
    phone: '+91 98765 43210',
    role: 'Inventory Manager',
    company: 'StockMaster Inc.'
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    stockOut: true,
    newReceipts: false,
    deliveries: true,
    transfers: false,
    adjustments: true
  });

  const handleSaveWarehouse = () => {
    if (editingWarehouse) {
      setWarehouses(warehouses.map(w => 
        w.id === editingWarehouse.id 
          ? { ...editingWarehouse, ...warehouseForm, occupied: editingWarehouse.occupied }
          : w
      ));
    } else {
      const newWarehouse = {
        id: warehouses.length + 1,
        ...warehouseForm,
        occupied: 0,
        status: 'Active'
      };
      setWarehouses([...warehouses, newWarehouse]);
    }
    setShowWarehouseModal(false);
    setEditingWarehouse(null);
    setWarehouseForm({ name: '', address: '', manager: '', capacity: '' });
  };

  const handleEditWarehouse = (warehouse) => {
    setEditingWarehouse(warehouse);
    setWarehouseForm({
      name: warehouse.name,
      address: warehouse.address,
      manager: warehouse.manager,
      capacity: warehouse.capacity
    });
    setShowWarehouseModal(true);
  };

  const handleDeleteWarehouse = (id) => {
    if (confirm('Are you sure you want to delete this warehouse?')) {
      setWarehouses(warehouses.filter(w => w.id !== id));
    }
  };

  const getOccupancyColor = (percent) => {
    if (percent >= 80) return 'text-red-600 bg-red-100';
    if (percent >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-green-600 bg-green-100';
  };

  const tabs = [
    { id: 'warehouses', name: 'Warehouses', icon: Warehouse },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage warehouses, profile, and system preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm mb-6">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Warehouses Tab */}
      {activeTab === 'warehouses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Warehouse Locations</h2>
            <button 
              onClick={() => setShowWarehouseModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Warehouse
            </button>
          </div>

          {/* Warehouses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {warehouses.map(warehouse => {
              const occupancyPercent = Math.round((warehouse.occupied / warehouse.capacity) * 100);
              return (
                <div key={warehouse.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Warehouse className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{warehouse.name}</h3>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {warehouse.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditWarehouse(warehouse)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteWarehouse(warehouse.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{warehouse.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Manager: {warehouse.manager}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Capacity</span>
                      <span className={`font-semibold px-2 py-1 rounded ${getOccupancyColor(occupancyPercent)}`}>
                        {occupancyPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          occupancyPercent >= 80 ? 'bg-red-500' :
                          occupancyPercent >= 60 ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${occupancyPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {warehouse.occupied} / {warehouse.capacity} units
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <button className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              Change Photo
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={userSettings.phone}
                    onChange={(e) => setUserSettings({...userSettings, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value={userSettings.role}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={userSettings.company}
                    onChange={(e) => setUserSettings({...userSettings, company: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all mt-6">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
          
          <div className="space-y-4">
            {Object.entries({
              lowStock: 'Low Stock Alerts',
              stockOut: 'Out of Stock Alerts',
              newReceipts: 'New Receipt Notifications',
              deliveries: 'Delivery Updates',
              transfers: 'Internal Transfer Updates',
              adjustments: 'Stock Adjustment Alerts'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{label}</span>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, [key]: !notifications[key]})}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[key] ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications[key] ? 'left-7' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>

          <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all mt-6">
            <Save className="w-5 h-5" />
            Save Preferences
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Enable 2FA</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  Enable
                </button>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              <Save className="w-5 h-5" />
              Update Security Settings
            </button>
          </div>
        </div>
      )}

      {/* Warehouse Modal */}
      {showWarehouseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}
              </h2>
              <button 
                onClick={() => {
                  setShowWarehouseModal(false);
                  setEditingWarehouse(null);
                  setWarehouseForm({ name: '', address: '', manager: '', capacity: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse Name</label>
                <input
                  type="text"
                  value={warehouseForm.name}
                  onChange={(e) => setWarehouseForm({...warehouseForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Main Warehouse"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={warehouseForm.address}
                  onChange={(e) => setWarehouseForm({...warehouseForm, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager Name</label>
                  <input
                    type="text"
                    value={warehouseForm.manager}
                    onChange={(e) => setWarehouseForm({...warehouseForm, manager: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Manager name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (units)</label>
                  <input
                    type="number"
                    value={warehouseForm.capacity}
                    onChange={(e) => setWarehouseForm({...warehouseForm, capacity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="5000"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowWarehouseModal(false);
                    setEditingWarehouse(null);
                    setWarehouseForm({ name: '', address: '', manager: '', capacity: '' });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveWarehouse}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {editingWarehouse ? 'Update' : 'Add'} Warehouse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}