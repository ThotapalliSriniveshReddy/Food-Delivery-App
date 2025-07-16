import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Truck } from 'lucide-react';
import { useRestaurants } from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const { restaurants, loading, error } = useRestaurants();
  
  // Get first 3 restaurants as featured
  const featuredRestaurants = restaurants.slice(0, 3);

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-red-500" />,
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Safe & Secure",
      description: "Your payment information is always protected"
    },
    {
      icon: <Truck className="h-8 w-8 text-red-500" />,
      title: "Real-time Tracking",
      description: "Track your order from restaurant to your door"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Delicious Food
              <br />
              <span className="text-yellow-200">Delivered Fast</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Order from your favorite restaurants and get it delivered right to your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/restaurants"
                className="bg-white text-red-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-red-500 transition-colors">
                Download App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose TomatoEats?
            </h2>
            <p className="text-xl text-gray-600">
              We make food delivery simple, fast, and reliable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Restaurants
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing food from top-rated restaurants
            </p>
          </div>

          {loading ? (
            <LoadingSpinner size="lg" className="py-12" />
          ) : error ? (
            <ErrorMessage message={error} className="py-12" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                      ⭐ {restaurant.rating}
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 mb-2 capitalize">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>🕒 {restaurant.deliveryTime}</span>
                      <span>₹{restaurant.deliveryFee} delivery</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/restaurants"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center"
            >
              View All Restaurants
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join thousands of satisfied customers who trust TomatoEats for their food delivery needs
          </p>
          <Link
            to="/restaurants"
            className="bg-white text-red-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Ordering
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;