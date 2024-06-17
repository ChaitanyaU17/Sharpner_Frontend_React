import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import { CartContext } from '../utils/CartContext';

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://dummyjson.com/products/${params.id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container mt-4 d-flex">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
          <Card.Text>
            <strong>${product.price}</strong>
          </Card.Text>
          <Button variant="info" onClick={() => addItemToCart(product)}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
      <div className="ms-4 w-25">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
