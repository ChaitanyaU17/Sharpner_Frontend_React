import React, { useReducer } from 'react';
import CartContext from './cartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Add logic to update items and totalAmount based on added item
      return { ...state, items: [...state.items, action.item] };
    case 'REMOVE':
      // Add logic to remove item and update totalAmount
      return { ...state };
    case 'CLEAR':
      return defaultCartState;
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCart = (item) => {
    dispatchCartAction({ type: 'ADD', item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: 'REMOVE', id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
