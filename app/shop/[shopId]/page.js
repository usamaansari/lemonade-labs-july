'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FiShoppingCart, FiStar, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// Mock shop data - in a real app, this would come from an API
const shopData = {
  id: 'lemonade-stand',
  name: "Emma's Lemonade Stand",
  description: 'Fresh homemade lemonade and treats made with love!',
  rating: 4.8,
  reviewCount: 24,
  products: [
    {
      id: 1,
      name: 'Classic Lemonade',
      price: 2.50,
      description: 'Freshly squeezed lemons with just the right amount of sweetness',
      image: '🍋',
      category: 'Drinks'
    },
    {
      id: 2,
      name: 'Strawberry Lemonade',
      price: 3.00,
      description: 'Our classic lemonade with fresh strawberries',
      image: '🍓',
      category: 'Drinks'
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookie',
      price: 1.50,
      description: 'Homemade cookies with melty chocolate chips',
      image: '🍪',
      category: 'Snacks'
    },
    {
      id: 4,
      name: 'Lemon Bar',
      price: 2.00,
      description: 'Tangy lemon custard on a buttery shortbread crust',
      image: '🍰',
      category: 'Desserts'
    }
  ],
  categories: ['All', 'Drinks', 'Snacks', 'Desserts']
};

export default function ShopPage() {
  const params = useParams();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const shop = shopData; // In a real app, fetch shop data based on shopId from params
  
  const filteredProducts = selectedCategory === 'All' 
    ? shop.products 
    : shop.products.filter(product => product.category === selectedCategory);
  
  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    setShowCart(true);
  };
  
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{shop.name}</h1>
            <div className="flex items-center text-yellow-500">
              <FiStar className="fill-current" />
              <span className="ml-1 text-sm text-gray-700">
                {shop.rating} ({shop.reviewCount} reviews)
              </span>
            </div>
          </div>
          <button 
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 text-gray-700 hover:text-blue-600"
          >
            <FiShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold text-blue-900 rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Shop Info */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to {shop.name}!</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {shop.description}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <div className="flex space-x-2 mx-auto">
            {shop.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl p-6">
                {product.image}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-full text-sm font-medium flex items-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setShowCart(false)}
            ></div>
            <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowCart(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {cart.length === 0 ? (
                          <div className="text-center py-12">
                            <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                            <p className="mt-1 text-sm text-gray-500">Start adding some items to your cart</p>
                          </div>
                        ) : (
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cart.map((item) => (
                              <li key={item.id} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <div className="w-full h-full flex items-center justify-center text-4xl">
                                    {item.image}
                                  </div>
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center border rounded-md">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                      >
                                        -
                                      </button>
                                      <span className="px-3">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-medium text-red-600 hover:text-red-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                        <p>Subtotal</p>
                        <p>${cartTotal.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="text-blue-600 font-medium hover:text-blue-500"
                            onClick={() => setShowCart(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
