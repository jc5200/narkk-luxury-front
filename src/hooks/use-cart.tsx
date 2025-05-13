
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options?: {
    [key: string]: string;
  };
}

interface CartContextType {
  cart: {
    items: CartItem[];
  };
  addItem: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [cart, setCart] = useState<{ items: CartItem[] }>({
    items: [],
  });

  // Calculate subtotal
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('narkk-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('narkk-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Check if the item already exists
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
        toast.success(`Updated ${newItem.name} quantity in cart`);
        return { ...prevCart, items: updatedItems };
      } else {
        // Item doesn't exist, add it
        toast.success(`Added ${newItem.name} to cart`);
        return {
          ...prevCart,
          items: [...prevCart.items, newItem],
        };
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return { ...prevCart, items: updatedItems };
    });
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
      return { ...prevCart, items: updatedItems };
    });
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCart({ items: [] });
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
