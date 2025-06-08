import React, { useState } from "react";

const predefinedIngredients = [
  "Eggs", "Milk", "Cheese", "Tomato", "Bread", "Butter",
  "Chicken", "Rice", "Onion", "Garlic", "Potato"
];

const IngredientSelector = ({
    selectedIngredients,
    setSelectedIngredients,
    fetchRecipes
  }) => {
    const [customIngredient, setCustomIngredient] = useState("");
  
    // Handles checkbox toggle
    const handleCheckboxChange = (ing) => {
      setSelectedIngredients(prev =>
        prev.includes(ing)
          ? prev.filter(item => item !== ing)
          : [...prev, ing]
      );
    };
  
    const addCustomIngredient = () => {
      const trimmed = customIngredient.trim();
      if (trimmed && !selectedIngredients.includes(trimmed)) {
        setSelectedIngredients(prev => [...prev, trimmed]);
        setCustomIngredient("");
      }
    };
  
    return (
      <div className="ingredient-section">
        <h2>What's in Your Fridge?</h2>
  
        {/* Checkbox grid */}
        <div className="checkbox-group">
          {predefinedIngredients.map((item, idx) => (
            <label key={idx} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedIngredients.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />{" "}{item}
            </label>
          ))}
        </div>
  
        {/* Add custom ingredient */}
        <div className="input-group">
          <input
            type="text"
            value={customIngredient}
            onChange={e => setCustomIngredient(e.target.value)}
            placeholder="Add other ingredients"
          />
          <button onClick={addCustomIngredient} className="main-button small">
            Add
          </button>
        </div>
  
        {/* Display selected items as chips */}
        {selectedIngredients.length > 0 && (
          <div className="selected-chips">
            {selectedIngredients.map((item, idx) => (
              <div key={idx} className="chip">
                {item}
                <button
                  className="remove-chip"
                  onClick={() =>
                    setSelectedIngredients(prev =>
                      prev.filter(i => i !== item)
                    )
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
  
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button onClick={fetchRecipes} className="main-button">
            Generate Recipes
          </button>
        </div>
      </div>
    );
  };
  
  export default IngredientSelector;