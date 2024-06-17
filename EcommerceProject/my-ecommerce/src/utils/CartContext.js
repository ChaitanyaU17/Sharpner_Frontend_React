import React, { createContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCartVisibility = useCallback(() => {
    setCartVisible(prevVisible => !prevVisible);
  }, []);

  const addItemToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
        );
      }
      return [...prevItems, item];
    });
  }, []);

  const removeItemFromCart = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    addItemToCart,
    removeItemFromCart,
    getTotalPrice,
    cartVisible,
    toggleCartVisibility
  }), [cartItems, addItemToCart, removeItemFromCart, getTotalPrice, cartVisible, toggleCartVisibility]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
