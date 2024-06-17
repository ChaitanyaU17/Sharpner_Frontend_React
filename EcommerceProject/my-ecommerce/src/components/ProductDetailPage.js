import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Col, Image, Card, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
const ProductDetailPage = () => {
  const params = useParams();
  const [productDetail, setProductDetail] = useState(null);
  useEffect(
    () => {
      fetch(`https://dummyjson.com/products/${params.id}`)
        .then(res => res.json())
        .then(data => setProductDetail(data));
    },
    [params.id]
  );
  return (
    <div>
      {productDetail !== null &&
        <Row>
          <Col xs={6} className="bg-dark">
            <Carousel>
              {productDetail.images.map(image =>
                <Carousel.Item>
                  <Image src={image} className="w-100" />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>
          <Col xs={6}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {productDetail.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {productDetail.category} Price: ${productDetail.price}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Brand: {productDetail.brand}
                </Card.Subtitle>
                <Card.Text>
                  Summary: {productDetail.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>}
      {productDetail == null && <p>Loading...</p>}
    </div>
  );
};
export default ProductDetailPage;
