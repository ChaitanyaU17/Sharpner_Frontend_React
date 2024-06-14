// ProductCard.js
import React, { useContext } from "react";
import { CartContext } from '../utils/CartContext';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="mb-4 mt-5" style={{ maxWidth: '270px', marginLeft: '182px'}}>
      <div className="card" style={{ maxHeight: '400px'} }>
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h6 className="card-title">{product.title}</h6>
          <p className="card-text">${product.price}</p>
          <button 
            className="btn btn-primary"
            onClick={() => addItemToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
