import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <p>Generated recipe based on your ingredients!</p>

        {/* Show missing ingredients */}
        {recipe.missedIngredients.length > 0 && (
          <p style={{ color: '#e04e1f' }}>
            Missing: {recipe.missedIngredients.map((ing) => ing.name).join(", ")}
          </p>
        )}

        <a
          href={`https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-")}-${recipe.id}`}
          target="_blank"
          rel="noreferrer"
          className="main-button small"
        >
          View Recipe
        </a>
      </div>

      <img
        src={`https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg`}
        alt={recipe.title}
      />
    </div>
  );
};

export default RecipeCard;
