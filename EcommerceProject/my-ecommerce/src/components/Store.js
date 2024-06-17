import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const history = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(data => data.json())
      .then(data => {
        setProducts(data.products);
      });

    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const QueryHandler = (category) => {
    history(`/store?name=${category}`);
  };

  return (
    <div className='container mt-4'>
      <h1 className="text-center">PRODUCTS</h1>
      <DropdownButton
        id="dropdown-basic-button"
        title="Categories"
        className="m-2"
        variant="info"
      >
        {categories.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => QueryHandler(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <div className='row'>
        {queryParams.get("name") === null &&
          products.slice(0, pageCount * 10).map((product) => (
            <div className="col-6" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        {queryParams.get("name") !== null &&
          products
            .filter((product) => product.category === queryParams.get("name"))
            .map((product) => (
              <div className="col-6" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
      </div>
      <div className="d-flex justify-content-center">
        {(pageCount + 1) * 10 <= products.length &&
          pageCount * 10 < products.length &&
          queryParams.get("name") === null && (
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
