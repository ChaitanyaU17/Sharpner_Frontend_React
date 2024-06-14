// Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../utils/CartContext';
import CartItems from './CartItems';
import './Cart.css'; 

const Cart = () => {
  const { cartItems, getTotalPrice, cartVisible, toggleCartVisibility } = useContext(CartContext);

  const total = getTotalPrice();

  return (
    <div className={`cart-overlay ${cartVisible ? 'visible' : ''}`}>
      <div className="cart-container">
        <button className="close-btn" onClick={toggleCartVisibility}>X</button>
        <h1 className="text-center mb-4">CART</h1>
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <CartItems key={index} item={item} />
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center border-top pt-3">
          <span className="h5">Total</span>
          <span className="h5">${total.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-info btn-lg btn-block text-white mt-4">
            PURCHASE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;