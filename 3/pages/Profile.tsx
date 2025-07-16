import React from 'react';
import { User, MapPin, CreditCard, Bell, LogOut, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  const orderHistory = [
    {
      id: '1',
      restaurantName: 'Pizza Palace',
      items: ['Margherita Pizza', 'Garlic Bread'],
      total: 21.98,
      date: '2025-01-15',
      status: 'Delivered'
    },
    {
      id: '2',
      restaurantName: 'Burger Bistro',
      items: ['Cheese Burger', 'Fries'],
      total: 15.99,
      date: '2025-01-14',
      status: 'Delivered'
    },
    {
      id: '3',
      restaurantName: 'Sushi Sensation',
      items: ['California Roll', 'Miso Soup'],
      total: 28.50,
      date: '2025-01-12',
      status: 'Delivered'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your profile</h2>
          <p className="text-gray-600">You need to be signed in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Member since January 2025</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
              <Edit2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Personal Information</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Delivery Addresses</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Payment Methods</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Notifications</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Order History</h2>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{order.restaurantName}</h3>
                        <p className="text-sm text-gray-600">Order #{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{order.total}</p>
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        Items: {order.items.join(', ')}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">{order.date}</p>
                      <div className="space-x-2">
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          Reorder
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;