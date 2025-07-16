import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRestaurant, useMenuItems } from '../hooks/useApi';
import { formatPrice } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import MenuItemCard from '../components/MenuItemCard';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  
  const restaurantId = parseInt(id || '1');
  const { restaurant, loading: restaurantLoading, error: restaurantError } = useRestaurant(restaurantId);
  const { menuItems, loading: menuLoading, error: menuError } = useMenuItems(restaurantId);

  const isLoading = restaurantLoading || menuLoading;
  const hasError = restaurantError || menuError;

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantName: restaurant.name
    }, quantity);
    
    // Reset quantity
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (hasError || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={hasError || "Restaurant not found"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>{restaurant.rating} ({restaurant.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-5 w-5" />
                <span>{restaurant.address}</span>
              </div>
              <div className="text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  restaurant.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {restaurant.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Restaurant Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {restaurant.name}</h2>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Delivery Fee: ₹{restaurant.deliveryFee}</span>
                <span>Estimated Delivery: {restaurant.deliveryTime}</span>
                <span>Minimum Order: ₹{restaurant.minimumOrder}</span>
              </div>
            </div>

            {/* Menu Categories */}
            {restaurant.categories.map(category => {
              const categoryItems = menuItems.filter(item => item.category === category);
              
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category} className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{category}</h3>
                  <div className="space-y-4">
                    {categoryItems.map(item => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={quantities[item.id] || 0}
                        onQuantityChange={updateQuantity}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{restaurant.deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹29</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-gray-800">
                    <span>Total</span>
                    <span>₹{restaurant.deliveryFee + 29}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;