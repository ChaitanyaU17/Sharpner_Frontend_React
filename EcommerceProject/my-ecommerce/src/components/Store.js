import { useEffect, useState } from "react";
import GenricsCard from '../Layout/Card';
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Store = () => {
  const [product, setProduct] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(data => data.json())
      .then(data => {
        setProduct(data.products);
      });
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);
  const history = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const QueryHandler = cate => {
    history("/store?name=" + cate.slug);
   
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
        {categories.map((item,index) =>
          <Dropdown.Item key={index} onClick={() => QueryHandler(item)}>
            {item.name}
          </Dropdown.Item>
        )}
      </DropdownButton>
      <div className="row">
        {queryParams.get("name") === null &&
          product.map((item, index) => {
            return (
              index < pageCount * 10 &&
              <div className="col-6" key={item.id}>
                <GenricsCard
                  
                  title={item.title}
                  id={item.id}
                  price={item.price}
                  imageUrl={item.thumbnail}
                />
              </div>
            );
          })}
        {queryParams.get("name") !== null &&
          product.map((item, index) => {
            return (
              queryParams.get("name") === item.category &&
              <div className="col-lg-6" key={item.id}>
                <GenricsCard
                  title={item.title}
                  id={item.id}
                  price={item.price}
                  imageUrl={item.thumbnail}
                />
              </div>
            );
          })}
      </div>
      <div className="d-flex justify-content-center">
        {(pageCount + 1) * 10 <= product.length &&
          pageCount * 10 < product.length &&
          queryParams.get("name") === null &&
          <Button
            variant="secondary"
            onClick={() => {
              setPageCount(pageCount + 1);
            }}
          >
            View More
          </Button>}
      </div>
    </div>
  );
};

export default Store;
