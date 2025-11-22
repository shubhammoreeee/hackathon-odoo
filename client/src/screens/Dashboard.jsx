import React, { useState } from 'react';
import { 
  Package, TrendingUp, TrendingDown, AlertTriangle, 
  Truck, ArrowRightLeft, Menu, X, Search, Bell,
  User, LogOut, Settings, Warehouse, FileText,
  ClipboardList, BarChart3, Filter, ChevronDown
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const kpiData = [
    {
      title: 'Total Products',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Pending Receipts',
      value: '45',
      change: '+8%',
      trend: 'up',
      icon: Truck,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Deliveries',
      value: '32',
      change: '+3%',
      trend: 'up',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Internal Transfers',
      value: '18',
      change: '0%',
      trend: 'neutral',
      icon: ArrowRightLeft,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Out of Stock',
      value: '7',
      change: '-2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50'
    }
  ];

  const recentActivities = [
    { type: 'Receipt', item: 'Steel Rods', qty: '50 units', status: 'Done', time: '10 min ago', color: 'text-green-600' },
    { type: 'Delivery', item: 'Office Chairs', qty: '10 units', status: 'Ready', time: '25 min ago', color: 'text-blue-600' },
    { type: 'Transfer', item: 'Paint Cans', qty: '30 units', status: 'Waiting', time: '1 hour ago', color: 'text-amber-600' },
    { type: 'Adjustment', item: 'Steel Rods', qty: '-3 units', status: 'Done', time: '2 hours ago', color: 'text-purple-600' },
    { type: 'Receipt', item: 'Laptops', qty: '15 units', status: 'Draft', time: '3 hours ago', color: 'text-gray-600' }
  ];

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: Package, label: 'Products' },
    { icon: Truck, label: 'Receipts' },
    { icon: FileText, label: 'Deliveries' },
    { icon: ArrowRightLeft, label: 'Transfers' },
    { icon: ClipboardList, label: 'Adjustments' },
    { icon: Warehouse, label: 'Warehouses' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              StockMaster
            </span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Inventory Manager</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-white rounded-lg transition-colors">
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, John!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="p-4 lg:p-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>
              <select 
                value={selectedFilter}
                onClick={() => navigate("/receipt")}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="all">All Documents</option>
                <option value="receipts">Receipts</option>
                <option value="deliveries">Deliveries</option>
                <option value="transfers">Internal Transfers</option>
                <option value="adjustments">Adjustments</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="waiting">Waiting</option>
                <option value="ready">Ready</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
              <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                Clear Filters
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {kpiData.map((kpi, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${kpi.bgColor} rounded-xl flex items-center justify-center`}>
                    <div className={`bg-gradient-to-br ${kpi.color} p-3 rounded-lg`}>
                      <kpi.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
                    kpi.trend === 'up' ? 'bg-green-50 text-green-600' :
                    kpi.trend === 'down' ? 'bg-red-50 text-red-600' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                     kpi.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
                    {kpi.change}
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 ${activity.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                      <span className={`text-xs font-bold ${activity.color}`}>{activity.type[0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.item} • {activity.qty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      activity.status === 'Done' ? 'bg-green-100 text-green-700' :
                      activity.status === 'Ready' ? 'bg-blue-100 text-blue-700' :
                      activity.status === 'Waiting' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.status}
                    </span>
                    <span className="text-sm text-gray-500 hidden sm:block">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}