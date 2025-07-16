import React from 'react';
import { Plus, Minus, Leaf, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { formatPrice } from '../services/api';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onQuantityChange: (itemId: number, change: number) => void;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  quantity,
  onQuantityChange,
  onAddToCart
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-full md:w-32 h-32 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
          <div className="flex items-center space-x-1">
            {item.isVegetarian && (
              <div className="flex items-center justify-center w-5 h-5 border-2 border-green-500 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
            {item.isVegan && <Leaf className="h-4 w-4 text-green-500" />}
            {item.isSpicy && <Flame className="h-4 w-4 text-red-500" />}
          </div>
        </div>
        
        <p className="text-gray-600 mb-3">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-red-500">{formatPrice(item.price)}</span>
            <span className="text-xs text-gray-500">{item.preparationTime} min prep</span>
          </div>
          <div className="text-xs text-gray-500">
            <div>{item.nutritionalInfo.calories} cal</div>
            <div>Protein: {item.nutritionalInfo.protein}g</div>
          </div>
        </div>

        {item.allergens.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-gray-500">
              Contains: {item.allergens.join(', ')}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {quantity > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onQuantityChange(item.id, -1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-semibold min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => onQuantityChange(item.id, 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
            <button
              onClick={() => {
                if (quantity > 0) {
                  onAddToCart(item);
                } else {
                  onQuantityChange(item.id, 1);
                }
              }}
              disabled={!item.availability}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                item.availability
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {quantity > 0 ? (
                <span>Add to Cart</span>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>{item.availability ? 'Add' : 'Unavailable'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;