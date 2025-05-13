
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

const Cart = () => {
  const { cart, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  // Display formatted options for cart items
  const formatOptions = (options?: { [key: string]: string }) => {
    if (!options) return null;
    
    return (
      <ul className="text-sm text-gray-500">
        {Object.entries(options).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    );
  };

  // Handle quantity change
  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8 text-narkk-clay">
          SHOPPING CART
        </h1>

        {cart.items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 mb-8">Your cart is empty.</p>
            <Link
              to="/shop"
              className="btn-primary"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <div key={item.id} className="py-8 flex flex-col md:flex-row">
                  <div className="flex-shrink-0 md:w-32 md:h-32 mb-4 md:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-grow md:ml-6">
                    <div className="flex flex-col md:flex-row md:justify-between mb-4">
                      <div>
                        <Link to={`/product/some-slug`} className="text-xl font-playfair text-narkk-slate hover:text-narkk-clay">
                          {item.name}
                        </Link>
                        {formatOptions(item.options)}
                      </div>
                      <div className="font-medium text-narkk-slate mt-2 md:mt-0">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-2xl font-medium text-narkk-slate">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-narkk-clay text-white py-3 px-8 rounded hover:bg-opacity-90 transition-colors"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500 text-right">
                Shipping and taxes calculated at checkout
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
