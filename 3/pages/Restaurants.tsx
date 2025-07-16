import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock } from 'lucide-react';
import { useRestaurants, useSearch } from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { restaurants: allRestaurants, loading: restaurantsLoading, error: restaurantsError } = useRestaurants();
  const { results: searchResults, loading: searchLoading, search } = useSearch();

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'italian', name: 'Italian' },
    { id: 'american', name: 'American' },
    { id: 'japanese', name: 'Japanese' },
    { id: 'indian', name: 'Indian' },
    { id: 'mexican', name: 'Mexican' },
    { id: 'chinese', name: 'Chinese' }
  ];

  // Handle search
  React.useEffect(() => {
    if (searchTerm.trim()) {
      search(searchTerm, selectedCategory);
    }
  }, [searchTerm, selectedCategory]);

  // Determine which restaurants to show
  const getDisplayRestaurants = () => {
    if (searchTerm.trim()) {
      return searchResults.restaurants;
    }
    
    if (selectedCategory === 'all') {
      return allRestaurants;
    }
    
    return allRestaurants.filter(restaurant => restaurant.cuisine === selectedCategory);
  };

  const displayRestaurants = getDisplayRestaurants();
  const isLoading = restaurantsLoading || searchLoading;
  const hasError = restaurantsError;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Restaurants Near You
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing food from local restaurants
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-gray-600">
              {displayRestaurants.length} restaurant{displayRestaurants.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSpinner size="lg" className="py-12" />}

        {/* Error State */}
        {hasError && <ErrorMessage message={hasError} className="py-12" />}

        {/* Restaurant Grid */}
        {!isLoading && !hasError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{restaurant.rating}</span>
                    </div>
                  </div>
                  {!restaurant.isOpen && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Closed
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {restaurant.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <span className="font-medium">
                      ₹{restaurant.deliveryFee} delivery
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <span className="capitalize">{restaurant.cuisine} • </span>
                    <span>Min order: ₹{restaurant.minimumOrder}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !hasError && displayRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;