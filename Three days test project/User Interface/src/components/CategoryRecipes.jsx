
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryRecipes = ({ userId, token }) => {
    const { categoryName } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [cart, setCart] = useState([]);

    const dbUrl = `https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/recipes.json`;
    const cartUrl = `https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/users/${userId}/cart.json?auth=${token}`;

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch(dbUrl);
            const data = await response.json();
            const filteredRecipes = Object.entries(data).filter(
                ([, recipe]) => recipe.category === categoryName
            );
            setRecipes(filteredRecipes || []);
        };

        const fetchCart = async () => {
            if (!userId) return; // Prevent fetching if userId is not available
            const response = await fetch(cartUrl);
            const data = await response.json();
            setCart(data ? Object.values(data) : []);
        };

        fetchRecipes();
        fetchCart();
    }, [categoryName, userId, token]);

    const addToCart = async (recipe) => {
        if (!userId) {
            console.error("User ID is undefined. Cannot add to cart.");
            return;
        }

        const updatedCart = [...cart, recipe];
        await fetch(cartUrl, {
            method: "PUT",
            body: JSON.stringify(updatedCart),
            headers: { "Content-Type": "application/json" },
        });
        setCart(updatedCart);
        if (updatedCart) {
          alert('item added sucessfully!');
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">Recipes in {categoryName}</h1>
            <div className="recipes">
                {recipes.map(([key, recipe]) => (
                    <div key={key}>
                        <div className="shadow-lg bg-gray-100 my-4 w-[245px]">
                            <img className="h-44 p-2 w-60" src={recipe.image} alt={recipe.name} />
                            <h2 className="p-2 text-xl font-semibold">{recipe.name}</h2>
                            <p className="p-2 text-sm">{recipe.ingredients}</p>
                            <p className="p-2 font-semibold">{recipe.category}</p>
                            <p className="p-2 font-semibold">{recipe.price}</p>
                            <button
                                onClick={() => addToCart(recipe)}
                                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 mt-2"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryRecipes;
