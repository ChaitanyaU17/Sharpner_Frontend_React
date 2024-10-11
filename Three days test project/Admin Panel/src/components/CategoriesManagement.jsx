import { useState, useEffect } from "react";

const categoriesUrl = "https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/categories.json";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    setCategories(Object.entries(data || {}));
  };

  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();
    const newCategory = { name: categoryName, image: categoryImage };

    if (isEditing && currentCategoryId) {
      // Edit Category
      await fetch(`https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/categories/${currentCategoryId}.json`, {
        method: "PATCH",
        body: JSON.stringify(newCategory),
        headers: { "Content-Type": "application/json" },
      });
      setIsEditing(false);
      setCurrentCategoryId(null);
    } else {
      // Add Category
      await fetch(categoriesUrl, {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: { "Content-Type": "application/json" },
      });
    }

    setCategoryName("");
    setCategoryImage("");
    fetchCategories(); // Refresh list
  };

  const handleEditCategory = (id, category) => {
    setCategoryName(category.name);
    setCategoryImage(category.image);
    setIsEditing(true);
    setCurrentCategoryId(id);
  };

  const handleDeleteCategory = async (id) => {
    await fetch(`https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/categories/${id}.json`, {
      method: "DELETE",
    });
    fetchCategories(); // Refresh list
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl font-bold mb-6">{isEditing ? "Edit Category" : "Add Category"}</h2>

      {/* Add/Edit Category Form */}
      <form onSubmit={handleAddOrUpdateCategory}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="outline-none border-b-2 border-b-black px-1"
          required
        />

        <br />
        <input
          type="text"
          placeholder="Image URL"
          value={categoryImage}
          onChange={(e) => setCategoryImage(e.target.value)}
          className="outline-none border-b-2 border-b-black my-6 px-1"
          required
        />
        <br />
        <button className="bg-blue-400 p-2 rounded-lg my-4" type="submit">{isEditing ? "Update Category" : "Add Category"}</button>
      </form>

      {/* Display Categories */}
      <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
        {categories.map(([id, category]) => (
          <div key={id} className="bg-gray-100 shadow-lg p-4 rounded-lg w-[250px]">
            <img src={category.image} alt='' className="h-36 w-52" />
            <p className="text-xl font-semibold my-2">{category.name}</p>
            <button className="bg-blue-400 p-2 rounded-lg px-4 mr-4 hover:cursor-pointer" onClick={() => handleEditCategory(id, category)}>Edit</button>
            <button className="bg-blue-400 p-2 rounded-lg px-4" onClick={() => handleDeleteCategory(id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesManagement;
