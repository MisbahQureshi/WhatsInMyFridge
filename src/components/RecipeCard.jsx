import React from "react";

const RecipeCard = ({ recipe, onToggleSave, savedRecipes = [] }) => {
  const isSaved = savedRecipes.some((r) => r.id === recipe.id);

  return (
    <div className="recipe-card" style={{ position: "relative" }}>
      {/* Bookmark Icon */}
      {onToggleSave && (
        <button
          className="save-icon-button"
          onClick={() => onToggleSave(recipe)}
          title={isSaved ? "Remove from saved" : "Save recipe"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={isSaved ? "#ff5722" : "none"}
            stroke="#ff5722"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      )}

      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <p>Generated recipe based on your ingredients!</p>

        {/* Show missing ingredients (only if they exist) */}
        {recipe.missedIngredients?.length > 0 && (
          <p style={{ color: "#e04e1f" }}>
            Missing:{" "}
            {recipe.missedIngredients.map((ing) => ing.name).join(", ")}
          </p>
        )}

        <a
          href={`https://spoonacular.com/recipes/${recipe.title.replace(
            /\s+/g,
            "-"
          )}-${recipe.id}`}
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
