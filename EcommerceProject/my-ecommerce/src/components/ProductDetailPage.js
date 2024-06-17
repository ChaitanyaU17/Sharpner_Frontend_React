// src/components/ProductDetailPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../utils/CartContext';

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${params.id}`);
      const data = await response.json();
      console.log(data.items);
      setProduct(data);
    };

    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container mt-4">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
          <Card.Text>
            {product.description}
          </Card.Text>
          <Card.Text>
            <strong>${product.price}</strong>
          </Card.Text>
          <Button variant="primary" onClick={() => addItemToCart(product)}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
