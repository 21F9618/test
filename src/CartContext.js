import React, { createContext, useState, useContext } from 'react';

// Create Cart Context
const CartContext = createContext();

// Export hook for consuming context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => setCartItems((prevItems) => [...prevItems, item]);
  const removeFromCart = (itemId) =>
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
