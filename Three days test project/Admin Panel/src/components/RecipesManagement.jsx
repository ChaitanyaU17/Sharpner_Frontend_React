import { useState, useEffect } from "react";

const recipesUrl = "https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/recipes.json";
const categoriesUrl = "https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/categories.json";

const RecipesManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({
    name: "",
    category: "",
    ingredients: "",
    price: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch(recipesUrl);
    const data = await response.json();
    setRecipes(Object.entries(data || {}));
  };

  const fetchCategories = async () => {
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    setCategories(Object.entries(data || {}));
  };

  const handleAddOrUpdateRecipe = async (e) => {
    e.preventDefault();

    if (isEditing && currentRecipeId) {
      // Edit Recipe
      await fetch(`https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/recipes/${currentRecipeId}.json`, {
        method: "PATCH",
        body: JSON.stringify(recipeDetails),
        headers: { "Content-Type": "application/json" },
      });
      setIsEditing(false);
      setCurrentRecipeId(null);
    } else {
      // Add Recipe
      await fetch(recipesUrl, {
        method: "POST",
        body: JSON.stringify(recipeDetails),
        headers: { "Content-Type": "application/json" },
      });
    }

    setRecipeDetails({ name: "", category: "", ingredients: "", price: "", image: "" });
    fetchRecipes(); // Refresh list
  };

  const handleEditRecipe = (id, recipe) => {
    setRecipeDetails(recipe);
    setIsEditing(true);
    setCurrentRecipeId(id);
  };

  const handleDeleteRecipe = async (id) => {
    await fetch(`https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/recipes/${id}.json`, {
      method: "DELETE",
    });
    fetchRecipes(); // Refresh list
  };

  return (
    <div className="p-5">
      <h2 className=" text-4xl font-bold mb-6">{isEditing ? "Edit Recipe" : "Add Recipe"}</h2>

      {/* Add/Edit Recipe Form */}
      <form onSubmit={handleAddOrUpdateRecipe}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeDetails.name}
          onChange={(e) => setRecipeDetails({ ...recipeDetails, name: e.target.value })}
          className="outline-none border-b-2 border-b-black px-2"
          required
        />
        <select
          value={recipeDetails.category}
          onChange={(e) => setRecipeDetails({ ...recipeDetails, category: e.target.value })}
          className="ml-4 bg-blue-300 p-1 rounded-lg"
          required
        >
          <option value="">Select Category</option>
          {categories.map(([id, category]) => (
            <option key={id} value={category.name}>{category.name}</option>
          ))}
        </select>

        <br />

        <textarea
          placeholder="Ingredients"
          value={recipeDetails.ingredients}
          onChange={(e) => setRecipeDetails({ ...recipeDetails, ingredients: e.target.value })}
          className="my-4 outline-none border border-black p-2"
          required
        />

        <br />

        <input
          type="text"
          placeholder="Price"
          value={recipeDetails.price}
          onChange={(e) => setRecipeDetails({ ...recipeDetails, price: e.target.value })}
          className="outline-none border-b-2 border-b-black px-2 mb-4"
          required
        />

        <br />

        <input
          type="text"
          placeholder="Image URL"
          value={recipeDetails.image}
          onChange={(e) => setRecipeDetails({ ...recipeDetails, image: e.target.value })}
          className="outline-none border-b-2 border-b-black px-2 mb-4"
          required
        />

        <br />

        <button className="bg-blue-300 p-2 rounded-lg" type="submit">{isEditing ? "Update Recipe" : "Add Recipe"}</button>
      </form>

      {/* Display Recipes */}
      <div className="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
        {recipes.map(([id, recipe]) => (
          <div key={id} className="bg-gray-100 shadow-lg p-4 rounded-lg w-[250px]">
            <img src={recipe.image} alt='' className="h-36 w-52 object-cover rounded-lg" />
            <h4 className="text-xl font-semibold my-2">{recipe.name} - {recipe.category}</h4>
            <p className="text-sm">Ingredients: {recipe.ingredients}</p>
            <p className="py-2"><span className="font-semibold">Price:</span> {recipe.price}</p>
            <div className="flex justify-between">
              <button className="bg-blue-400 p-2 rounded-lg px-4 mr-4" onClick={() => handleEditRecipe(id, recipe)}>Edit</button>
              <button className="bg-red-400 p-2 rounded-lg px-4" onClick={() => handleDeleteRecipe(id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesManagement;
