import React, { useContext } from 'react';
import CartContext from '../utils/CartContext';
import CartItems from './CartItems';

const Cart = () => {
  const { cartItems, getTotalPrice, cartVisible, toggleCartVisibility } = useContext(CartContext);

  const total = getTotalPrice();

  return (
    <div className={`modal fade ${cartVisible ? 'show d-block' : 'd-none'}`}>
      <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cart</h5>
            <button type="button" className="close" onClick={toggleCartVisibility}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="list-group">
              {cartItems.map((item, index) => (
                <CartItems key={index} item={item} />
              ))}
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <span className="h5">Total</span>
            <span className="h5">${total.toFixed(2)}</span>
            <button className="btn btn-info btn-lg" onClick={toggleCartVisibility}>
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
