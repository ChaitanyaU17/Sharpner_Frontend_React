// src/components/GenricsCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GenricsCard = ({ title, id, price, imageUrl }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card style={{ width: '18rem', margin: '1rem' }} onClick={handleCardClick}>
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          ${price}
        </Card.Text>
        <Button variant="primary" onClick={handleCardClick}>View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default GenricsCard;
