import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-5 mb-4">
       <div className="card h-100" style={{ maxWidth: '300px', margin: 'auto' }}>
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
