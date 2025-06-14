import React from "react";
import RecipeCard from "./RecipeCard";

const SavedRecipes = ({ savedRecipes, onToggleSave }) => {
  return (
    <div className="container">
      <h1>Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p>You haven't saved any recipes yet.</p>
      ) : (
        savedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleSave={onToggleSave}
            savedRecipes={savedRecipes}
          />
        ))
      )}
    </div>
  );
};

export default SavedRecipes;
