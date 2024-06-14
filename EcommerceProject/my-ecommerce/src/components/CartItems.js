// CartItems.js
import React, { useContext } from 'react';
import { CartContext } from '../utils/CartContext';

const CartItems = ({ item }) => {
  const { removeItemFromCart } = useContext(CartContext);

  return (
    <div className="cart-item-container mb-3 border-bottom pb-3">
      <div className="row">
        <div className="col-4">
          <h5>ITEM</h5>
          <div className="d-flex align-items-center">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="img-fluid"
              style={{ width: "50px", height: "50px" }}
            />
            <span className="mx-3">{item.title}</span>
          </div>
        </div>
        <div className="col-4">
          <h5>PRICE</h5>
          <span className="mx-3">${item.price}</span>
        </div>
        <div className="col-4">
          <h5>QUANTITY</h5>
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control form-control-sm w-50"
              value={item.quantity}
              min="1"
            />
            <button 
              className="btn btn-danger btn-sm m-2 ml-2"
              onClick={() => removeItemFromCart(item.id)}
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
