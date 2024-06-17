import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartContext from "../utils/CartContext";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="mb-4 mt-5" style={{ maxWidth: '270px', marginLeft: '182px' }}>
      <Card border="light" style={{ maxHeight: '400px' }}>
        <Card.Header className="text-center">{product.title}</Card.Header>
        <Card.Body>
          <Link to={`/product-detail/${product.id}`}>
            <Card.Img className="h-50" src={product.imageUrl} />
          </Link>
          <Card.Text className="text-center">Price: $ {product.price}</Card.Text>
          <Button className="w-100" variant="info" onClick={() => addItemToCart(product)}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
