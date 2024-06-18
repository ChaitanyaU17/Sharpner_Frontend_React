import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Col, Image, Card, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProductDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {productDetail && (
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
                <Card.Text>
                  Summary: {productDetail.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductDetailPage;
