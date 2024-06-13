import React from 'react'

const CartItems = ({ item }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
      <div className="item-image">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="img-fluid"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <div className="item-details d-flex flex-column flex-md-row align-items-center">
        <span className="mx-3">{item.title}</span>
        <span className="mx-3">${item.price}</span>
        <div className="quantity-control d-flex align-items-center">
          <input
            type="number"
            className="form-control form-control-sm w-50"
            value={item.quantity}
            min="1"
          />
          <button className="btn btn-danger btn-sm ml-8">REMOVE</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems