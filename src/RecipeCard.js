import { useState } from "react";
import axios from "axios";

function RecipeCard({ recipe, apiKey }) {
  const [details, setDetails] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    if (details) {
      setExpanded(!expanded);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
        params: {
          apiKey,
          includeNutrition: false
        }
      });
      setDetails(res.data);
      setExpanded(true);
    } catch (err) {
      console.error("Error loading recipe details", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, width: 250, margin: 10 }}>
      <img src={recipe.image} alt={recipe.title} style={{ width: "100%", borderRadius: 8 }} />
      <p><strong>{recipe.title}</strong></p>
      <button onClick={fetchDetails}>
        {expanded ? "Hide Recipe" : "View Recipe"}
      </button>

      {loading && <p>Loading...</p>}

      {expanded && details && (
        <div style={{ marginTop: 10 }}>
          <p><strong>Missing Ingredients:</strong></p>
          <ul>
            {recipe.missedIngredients.map((ing, idx) => (
              <li key={idx}>❌ {ing.name}</li>
            ))}
          </ul>

          <p><strong>Used Ingredients:</strong></p>
          <ul>
            {recipe.usedIngredients.map((ing, idx) => (
              <li key={idx}>✅ {ing.name}</li>
            ))}
          </ul>

          <p><strong>Instructions:</strong></p>
          <div dangerouslySetInnerHTML={{ __html: details.instructions || "<i>No instructions available</i>" }} />
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
