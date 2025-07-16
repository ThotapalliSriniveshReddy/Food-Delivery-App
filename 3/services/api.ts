import { Restaurant, MenuItem, User, Order } from '../types';

const API_BASE_URL = 'https://api.tomatoeats.com/v1'; // Mock API base URL

// Mock data for demonstration
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Palace",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
    rating: 4.8,
    reviews: 324,
    deliveryTime: "25-30 min",
    deliveryFee: 49,
    address: "123 Food Street, Downtown, Mumbai",
    description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes passed down through generations.",
    cuisine: "italian",
    categories: ["Popular", "Pizzas", "Appetizers", "Beverages"],
    isOpen: true,
    minimumOrder: 200
  },
  {
    id: 2,
    name: "Burger Bistro",
    image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
    rating: 4.6,
    reviews: 256,
    deliveryTime: "20-25 min",
    deliveryFee: 39,
    address: "456 Burger Lane, Bandra, Mumbai",
    description: "Gourmet burgers made with premium ingredients and served with crispy fries.",
    cuisine: "american",
    categories: ["Popular", "Burgers", "Sides", "Beverages"],
    isOpen: true,
    minimumOrder: 150
  },
  {
    id: 3,
    name: "Sushi Sensation",
    image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
    rating: 4.9,
    reviews: 189,
    deliveryTime: "30-35 min",
    deliveryFee: 59,
    address: "789 Sushi Street, Powai, Mumbai",
    description: "Fresh sushi and traditional Japanese dishes prepared by expert chefs.",
    cuisine: "japanese",
    categories: ["Popular", "Sushi", "Ramen", "Appetizers"],
    isOpen: true,
    minimumOrder: 300
  },
  {
    id: 4,
    name: "Spice Garden",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    rating: 4.7,
    reviews: 412,
    deliveryTime: "35-40 min",
    deliveryFee: 45,
    address: "321 Spice Road, Andheri, Mumbai",
    description: "Authentic Indian curries and tandoor specialties with traditional spices.",
    cuisine: "indian",
    categories: ["Popular", "Curries", "Tandoor", "Rice & Breads"],
    isOpen: true,
    minimumOrder: 180
  },
  {
    id: 5,
    name: "Taco Fiesta",
    image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg",
    rating: 4.5,
    reviews: 298,
    deliveryTime: "20-25 min",
    deliveryFee: 39,
    address: "654 Taco Avenue, Juhu, Mumbai",
    description: "Fresh tacos, burritos, and Mexican favorites with authentic flavors.",
    cuisine: "mexican",
    categories: ["Popular", "Tacos", "Burritos", "Sides"],
    isOpen: true,
    minimumOrder: 160
  },
  {
    id: 6,
    name: "Dragon Palace",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
    rating: 4.6,
    reviews: 367,
    deliveryTime: "25-30 min",
    deliveryFee: 49,
    address: "987 Dragon Street, Colaba, Mumbai",
    description: "Traditional Chinese cuisine and dim sum with authentic flavors.",
    cuisine: "chinese",
    categories: ["Popular", "Main Course", "Dim Sum", "Soups"],
    isOpen: true,
    minimumOrder: 200
  }
];

const mockMenuItems: MenuItem[] = [
  // Pizza Palace Items
  {
    id: 1,
    restaurantId: 1,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil leaves on thin crust",
    price: 299,
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
    category: "Popular",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    allergens: ["gluten", "dairy"],
    nutritionalInfo: { calories: 250, protein: 12, carbs: 30, fat: 10 },
    availability: true,
    preparationTime: 15
  },
  {
    id: 2,
    restaurantId: 1,
    name: "Pepperoni Pizza",
    description: "Pepperoni, mozzarella cheese, tomato sauce on crispy base",
    price: 349,
    image: "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg",
    category: "Popular",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    allergens: ["gluten", "dairy"],
    nutritionalInfo: { calories: 320, protein: 16, carbs: 32, fat: 15 },
    availability: true,
    preparationTime: 18
  },
  {
    id: 3,
    restaurantId: 1,
    name: "Supreme Pizza",
    description: "Pepperoni, sausage, mushrooms, peppers, onions, olives",
    price: 449,
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
    category: "Pizzas",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    allergens: ["gluten", "dairy"],
    nutritionalInfo: { calories: 380, protein: 20, carbs: 35, fat: 18 },
    availability: true,
    preparationTime: 20
  },
  {
    id: 4,
    restaurantId: 1,
    name: "Garlic Bread",
    description: "Fresh baked bread with garlic butter and herbs",
    price: 149,
    image: "https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg",
    category: "Appetizers",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    allergens: ["gluten", "dairy"],
    nutritionalInfo: { calories: 180, protein: 5, carbs: 25, fat: 8 },
    availability: true,
    preparationTime: 8
  },
  {
    id: 5,
    restaurantId: 1,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, caesar dressing",
    price: 199,
    image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
    category: "Appetizers",
    isVegetarian: true,
    isVegan: false,
    isSpicy: false,
    allergens: ["dairy", "eggs"],
    nutritionalInfo: { calories: 150, protein: 8, carbs: 12, fat: 10 },
    availability: true,
    preparationTime: 5
  },
  {
    id: 6,
    restaurantId: 1,
    name: "Coca Cola",
    description: "Refreshing cola beverage - 330ml",
    price: 59,
    image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg",
    category: "Beverages",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    allergens: [],
    nutritionalInfo: { calories: 140, protein: 0, carbs: 39, fat: 0 },
    availability: true,
    preparationTime: 1
  },

  // Burger Bistro Items
  {
    id: 7,
    restaurantId: 2,
    name: "Classic Beef Burger",
    description: "Juicy beef patty, lettuce, tomato, onion, pickles, special sauce",
    price: 249,
    image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
    category: "Popular",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    allergens: ["gluten", "dairy", "eggs"],
    nutritionalInfo: { calories: 450, protein: 25, carbs: 35, fat: 25 },
    availability: true,
    preparationTime: 12
  },
  {
    id: 8,
    restaurantId: 2,
    name: "Chicken Deluxe Burger",
    description: "Grilled chicken breast, cheese, lettuce, tomato, mayo",
    price: 229,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    category: "Popular",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    allergens: ["gluten", "dairy", "eggs"],
    nutritionalInfo: { calories: 380, protein: 28, carbs: 32, fat: 18 },
    availability: true,
    preparationTime: 10
  },
  {
    id: 9,
    restaurantId: 2,
    name: "Veggie Burger",
    description: "Plant-based patty, avocado, lettuce, tomato, vegan mayo",
    price: 199,
    image: "https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg",
    category: "Burgers",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    allergens: ["gluten"],
    nutritionalInfo: { calories: 320, protein: 15, carbs: 38, fat: 12 },
    availability: true,
    preparationTime: 10
  },
  {
    id: 10,
    restaurantId: 2,
    name: "Crispy Fries",
    description: "Golden crispy potato fries with sea salt",
    price: 99,
    image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
    category: "Sides",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    allergens: [],
    nutritionalInfo: { calories: 280, protein: 4, carbs: 36, fat: 14 },
    availability: true,
    preparationTime: 6
  },

  // Sushi Sensation Items
  {
    id: 11,
    restaurantId: 3,
    name: "California Roll",
    description: "Crab, avocado, cucumber, sesame seeds, nori",
    price: 399,
    image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
    category: "Popular",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    allergens: ["shellfish", "sesame"],
    nutritionalInfo: { calories: 200, protein: 12, carbs: 20, fat: 8 },
    availability: true,
    preparationTime: 15
  },
  {
    id: 12,
    restaurantId: 3,
    name: "Salmon Nigiri",
    description: "Fresh salmon over seasoned sushi rice (2 pieces)",
    price: 299,
    image: "https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg",
    category: "Sushi",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    allergens: ["fish"],
    nutritionalInfo: { calories: 140, protein: 18, carbs: 15, fat: 4 },
    availability: true,
    preparationTime: 8
  },
  {
    id: 13,
    restaurantId: 3,
    name: "Chicken Ramen",
    description: "Rich chicken broth, noodles, egg, green onions, nori",
    price: 349,
    image: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg",
    category: "Ramen",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    allergens: ["gluten", "eggs"],
    nutritionalInfo: { calories: 420, protein: 22, carbs: 45, fat: 16 },
    availability: true,
    preparationTime: 18
  },

  // Spice Garden Items
  {
    id: 14,
    restaurantId: 4,
    name: "Butter Chicken",
    description: "Tender chicken in rich tomato and cream curry",
    price: 329,
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    category: "Popular",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    allergens: ["dairy"],
    nutritionalInfo: { calories: 380, protein: 28, carbs: 12, fat: 24 },
    availability: true,
    preparationTime: 20
  },
  {
    id: 15,
    restaurantId: 4,
    name: "Paneer Tikka Masala",
    description: "Grilled paneer in spiced tomato gravy",
    price: 299,
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    category: "Popular",
    isVegetarian: true,
    isVegan: false,
    isSpicy: true,
    allergens: ["dairy"],
    nutritionalInfo: { calories: 320, protein: 18, carbs: 15, fat: 22 },
    availability: true,
    preparationTime: 18
  },
  {
    id: 16,
    restaurantId: 4,
    name: "Biryani (Chicken)",
    description: "Fragrant basmati rice with spiced chicken and herbs",
    price: 379,
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
    category: "Rice & Breads",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    allergens: ["dairy"],
    nutritionalInfo: { calories: 450, protein: 25, carbs: 55, fat: 15 },
    availability: true,
    preparationTime: 25
  },

  // Taco Fiesta Items
  {
    id: 17,
    restaurantId: 5,
    name: "Chicken Tacos",
    description: "Grilled chicken, salsa, lettuce, cheese in soft tortillas (3 pieces)",
    price: 199,
    image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg",
    category: "Popular",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    allergens: ["gluten", "dairy"],
    nutritionalInfo: { calories: 320, protein: 22, carbs: 28, fat: 14 },
    availability: true,
    preparationTime: 12
  },
  {
    id: 18,
    restaurantId: 5,
    name: "Beef Burrito",
    description: "Seasoned beef, rice, beans, cheese, salsa in flour tortilla",
    price: 249,
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    category: "Burritos",
    isVegetarian: false,
    isVegan: false,
    isSpicy: true,
    allergens: ["gluten", "dairy"],
    nutritionalInfo: { calories: 520, protein: 28, carbs: 45, fat: 25 },
    availability: true,
    preparationTime: 15
  },

  // Dragon Palace Items
  {
    id: 19,
    restaurantId: 6,
    name: "Sweet & Sour Chicken",
    description: "Crispy chicken with bell peppers in tangy sauce",
    price: 279,
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
    category: "Popular",
    isVegetarian: false,
    isVegan: false,
    isSpicy: false,
    allergens: ["gluten"],
    nutritionalInfo: { calories: 350, protein: 24, carbs: 32, fat: 16 },
    availability: true,
    preparationTime: 16
  },
  {
    id: 20,
    restaurantId: 6,
    name: "Vegetable Fried Rice",
    description: "Wok-fried rice with mixed vegetables and soy sauce",
    price: 199,
    image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg",
    category: "Main Course",
    isVegetarian: true,
    isVegan: true,
    isSpicy: false,
    allergens: ["soy"],
    nutritionalInfo: { calories: 280, protein: 8, carbs: 52, fat: 6 },
    availability: true,
    preparationTime: 12
  }
];

// API Service Functions
export const apiService = {
  // Restaurant APIs
  async getRestaurants(): Promise<Restaurant[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRestaurants), 500);
    });
  },

  async getRestaurantById(id: number): Promise<Restaurant | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const restaurant = mockRestaurants.find(r => r.id === id);
        resolve(restaurant || null);
      }, 300);
    });
  },

  async searchRestaurants(query: string, cuisine?: string): Promise<Restaurant[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = mockRestaurants.filter(restaurant => 
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (cuisine && cuisine !== 'all') {
          filtered = filtered.filter(restaurant => restaurant.cuisine === cuisine);
        }
        
        resolve(filtered);
      }, 400);
    });
  },

  // Menu APIs
  async getMenuItems(restaurantId: number): Promise<MenuItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = mockMenuItems.filter(item => item.restaurantId === restaurantId);
        resolve(items);
      }, 400);
    });
  },

  async getMenuItemById(id: number): Promise<MenuItem | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = mockMenuItems.find(item => item.id === id);
        resolve(item || null);
      }, 200);
    });
  },

  async getMenuItemsByCategory(restaurantId: number, category: string): Promise<MenuItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = mockMenuItems.filter(item => 
          item.restaurantId === restaurantId && item.category === category
        );
        resolve(items);
      }, 300);
    });
  },

  // Search APIs
  async searchMenuItems(query: string): Promise<MenuItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockMenuItems.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 400);
    });
  },

  // User APIs
  async getUserProfile(userId: string): Promise<User | null> {
    // Mock user data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: userId,
          name: "John Doe",
          email: "john@example.com",
          phone: "+91 9876543210",
          addresses: [
            {
              id: "1",
              type: "home",
              street: "123 Main Street, Apartment 4B",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400001",
              landmark: "Near Central Mall",
              isDefault: true
            }
          ]
        });
      }, 300);
    });
  },

  // Order APIs
  async createOrder(orderData: Omit<Order, 'id' | 'orderTime' | 'status'>): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order: Order = {
          ...orderData,
          id: `ORD${Date.now()}`,
          orderTime: new Date().toISOString(),
          status: 'pending'
        };
        resolve(order);
      }, 500);
    });
  },

  async getOrderHistory(userId: string): Promise<Order[]> {
    // Mock order history
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'ORD1705123456',
            userId,
            restaurantId: 1,
            items: [
              { ...mockMenuItems[0], quantity: 1, restaurantName: 'Pizza Palace' },
              { ...mockMenuItems[3], quantity: 1, restaurantName: 'Pizza Palace' }
            ],
            subtotal: 448,
            deliveryFee: 49,
            serviceFee: 29,
            total: 526,
            status: 'delivered',
            orderTime: '2025-01-15T14:30:00Z',
            estimatedDelivery: '2025-01-15T15:00:00Z',
            deliveryAddress: {
              id: "1",
              type: "home",
              street: "123 Main Street, Apartment 4B",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400001",
              isDefault: true
            }
          }
        ]);
      }, 400);
    });
  }
};

// Utility functions
export const formatPrice = (price: number): string => {
  return `₹${price}`;
};

export const calculateDeliveryTime = (baseTime: string, itemCount: number): string => {
  const [min, max] = baseTime.split('-').map(t => parseInt(t));
  const additionalTime = Math.floor(itemCount / 3) * 5; // 5 min per 3 items
  return `${min + additionalTime}-${max + additionalTime} min`;
};

export const isRestaurantOpen = (restaurant: Restaurant): boolean => {
  // Simple logic - can be enhanced with actual opening hours
  const currentHour = new Date().getHours();
  return currentHour >= 9 && currentHour <= 23; // 9 AM to 11 PM
};