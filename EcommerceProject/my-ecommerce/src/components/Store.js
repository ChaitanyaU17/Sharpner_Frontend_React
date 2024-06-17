import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import GenricsCard from './Card'; 

const Store = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [categories, setCategories] = useState([]);

  console.log(categories);
  
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

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const handleCategoryChange = category => {
    navigate(`/store?name=${category.slug}`);
  };

  return (
    <div>
      <h1 className="text-center">PRODUCTS</h1>
      <DropdownButton
        id="dropdown-basic-button"
        title="Categories"
        className="m-2"
        variant="info"
      >
        {categories.map((category, index) => (
          <Dropdown.Item key={index} onClick={() => handleCategoryChange(category)}>
            {category.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <div className="row" style={{marginLeft: '200px'}}>
        {queryParams.get("name") === null &&
          products.slice(0, pageCount * 10).map((product) => (
            <div className="col-6" key={product.id}>
              <GenricsCard
                title={product.title}
                id={product.id}
                price={product.price}
                imageUrl={product.thumbnail}
              />
            </div>
          ))}
        {queryParams.get("name") !== null &&
          products
            .filter(product => product.category === queryParams.get("name"))
            .map((product) => (
              <div className="col-6" key={product.id}>
                <GenricsCard
                  title={product.title}
                  id={product.id}
                  price={product.price}
                  imageUrl={product.thumbnail}
                />
              </div>
            ))}
      </div>
      <div className="d-flex justify-content-center">
        {(pageCount + 1) * 10 <= products.length &&
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
