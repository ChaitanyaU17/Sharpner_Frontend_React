import { useEffect, useState } from "react";
import GenricsCard from '../Layout/Card';
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const queryHandler = (category) => {
    navigate(`/store?name=${category}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredProducts = queryParams.get("name")
    ? products.filter(product => product.category === queryParams.get("name"))
    : products.slice(0, pageCount * 10);

  return (
    <div>
      <h1 className="text-center">PRODUCTS</h1>
      <DropdownButton
        id="dropdown-basic-button"
        title="Categories"
        className="m-2"
        variant="info"
      >
        {categories.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => queryHandler(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <div className="row">
        {filteredProducts.map((item) => (
          <div className="col-6" key={item.id}>
            <GenricsCard
              title={item.title}
              id={item.id}
              price={item.price}
              imageUrl={item.thumbnail}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        {pageCount * 10 < products.length && !queryParams.get("name") && (
          <Button
            variant="secondary"
            onClick={() => setPageCount(pageCount + 1)}
          >
            View More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Store;
