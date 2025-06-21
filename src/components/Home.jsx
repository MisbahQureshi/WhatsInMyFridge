import React, { useState } from "react";
import IngredientSelector from "./IngredientSelector";
import RecipeCard from "./RecipeCard";
import axios from "axios";

const Home = ({ onToggleSave, savedRecipes }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  const fetchRecipes = async () => {
    if (selectedIngredients.length === 0) return;
    setLoading(true);
    setRecipes([]);
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        {
          params: {
            ingredients: selectedIngredients.join(","),
            number: 5,
            apiKey: SPOONACULAR_API_KEY,
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <IngredientSelector
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        fetchRecipes={fetchRecipes}
      />

      {loading && <p className="loading-text">Loading recipes...</p>}

      <div className="recipes-section">
        <h2>Recipes</h2>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleSave={onToggleSave}
            savedRecipes={savedRecipes}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
