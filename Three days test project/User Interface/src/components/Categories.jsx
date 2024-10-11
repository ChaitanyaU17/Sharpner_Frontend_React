import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const dbUrl = "https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/categories.json";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(dbUrl);
      const data = await response.json();
      setCategories(Object.entries(data) || {});
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${categoryName}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-5">Browse Categories</h1>
      <div className="categories">
        {categories.map(([key, category]) => (
          <div key={key} onClick={() => handleCategoryClick(category.name)}>
            <div className="shadow-lg bg-gray-100 my-4 w-[245px]">
              <img className="h-44 m-2 w-56" src={category.image} alt={category.name} />
              <h2 className="p-2 text-xl font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
