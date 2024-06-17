import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Col, Image, Card, Row } from "react-bootstrap";

const ProductDetailPage = () => {
  const params = useParams();
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then(res => res.json())
      .then(data => setProductDetail(data));
  }, [params.id]);

  return (
    <div>
      {productDetail ? (
        <Row>
          <Col xs={6} className="bg-dark">
            <Carousel>
              {productDetail.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <Image src={image} className="w-100" />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={6}>
            <Card>
              <Card.Body>
                <Card.Title>{productDetail.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {productDetail.category} Price: ${productDetail.price}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Brand: {productDetail.brand}
                </Card.Subtitle>
                <Card.Text>Summary: {productDetail.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
