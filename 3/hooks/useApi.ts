import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Restaurant, MenuItem } from '../types';

// Custom hook for fetching restaurants
export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await apiService.getRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch restaurants');
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error, refetch: () => setLoading(true) };
};

// Custom hook for fetching a single restaurant
export const useRestaurant = (id: number) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const data = await apiService.getRestaurantById(id);
        setRestaurant(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch restaurant');
        console.error('Error fetching restaurant:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  return { restaurant, loading, error };
};

// Custom hook for fetching menu items
export const useMenuItems = (restaurantId: number) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await apiService.getMenuItems(restaurantId);
        setMenuItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch menu items');
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  return { menuItems, loading, error };
};

// Custom hook for searching
export const useSearch = () => {
  const [results, setResults] = useState<{
    restaurants: Restaurant[];
    menuItems: MenuItem[];
  }>({ restaurants: [], menuItems: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, cuisine?: string) => {
    if (!query.trim()) {
      setResults({ restaurants: [], menuItems: [] });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const [restaurants, menuItems] = await Promise.all([
        apiService.searchRestaurants(query, cuisine),
        apiService.searchMenuItems(query)
      ]);

      setResults({ restaurants, menuItems });
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};