import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import Home from "./components/Home";
import SavedRecipes from "./components/SavedRecipes";
import MealPlans from "./components/MealPlans";
import Community from "./components/Community";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.error("Login failed", error));
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="logo-text">Fresh Picks</h1>
          <p>Find recipes based on what you have in your Fridge!</p>
          <button onClick={handleLogin} className="main-button google-button">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>Fresh Picks</div>
        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/recipes")}>Recipes</span>
          <span onClick={() => navigate("/mealplans")}>Meal Plans</span>
          <span onClick={() => navigate("/community")}>Community</span>
          {/* <span className="user-icon" onClick={handleLogout}>👤</span> */}
          <div className="profile-dropdown">
  <span className="user-icon" onClick={() => setShowDropdown(prev => !prev)}>👤</span>
  {showDropdown && (
    <div className="dropdown-menu">
      <button onClick={handleLogout}>Logout</button>
    </div>
  )}
</div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<SavedRecipes />} />
        <Route path="/mealplans" element={<MealPlans />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </>
  );
}

export default App;
