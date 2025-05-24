import { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import RecipeCard from "./RecipeCard";

// Predefined ingredients
const predefinedIngredients = [
  "Eggs", "Milk", "Cheese", "Tomato", "Bread", "Butter",
  "Chicken", "Rice", "Onion", "Garlic", "Potato", "Spinach"
];

function App() {
  const [user, setUser] = useState(null);
  const [customIngredient, setCustomIngredient] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const SPOONACULAR_API_KEY = "fe2d7d6a4cab4f95ae4127a1e0536203";

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.error("Login failed", error));
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  const handleCheckboxChange = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const addCustomIngredient = () => {
    const trimmed = customIngredient.trim();
    if (trimmed !== "" && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients([...selectedIngredients, trimmed]);
      setCustomIngredient("");
    }
  };

  const fetchRecipes = async () => {
    if (selectedIngredients.length === 0) return;

    setLoading(true);
    setRecipes([]);

    try {
      const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
        params: {
          ingredients: selectedIngredients.join(","),
          number: 5,
          apiKey: SPOONACULAR_API_KEY
        }
      });

      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>What's in My Fridge</h1>

      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>

          <hr />

          <h2>Select Ingredients</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {predefinedIngredients.map((item, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                {item}
              </label>
            ))}
          </div>

          <h3>Or Add Your Own</h3>
          <input
            type="text"
            value={customIngredient}
            onChange={(e) => setCustomIngredient(e.target.value)}
            placeholder="e.g. Mushrooms"
          />
          <button onClick={addCustomIngredient}>Add</button>

          <h3>Selected Ingredients:</h3>
          <ul>
            {selectedIngredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <button onClick={fetchRecipes}>Find Recipes</button>

          {loading && <p>Loading recipes...</p>}

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                apiKey={SPOONACULAR_API_KEY}
              />
            ))}
          </div>
        </>
      ) : (
        <button onClick={handleLogin}>Sign in with Google</button>
      )}
    </div>
  );
}

export default App;
