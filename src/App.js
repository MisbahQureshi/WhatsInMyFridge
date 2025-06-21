import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import Home from "./components/Home";
import SavedRecipes from "./components/SavedRecipes";
import MealPlans from "./components/MealPlans";
import Community from "./components/Community";
import "./index.css";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

  const [savedRecipes, setSavedRecipes] = useState([]);

  const fetchSavedRecipes = async (userId) => {
    const q = query(collection(db, "recipes"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const saved = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setSavedRecipes(saved);
  };

  useEffect(() => {
    if (user) fetchSavedRecipes(user.uid);
  }, [user]);

  const handleToggleSave = async (recipe) => {
    const exists = savedRecipes.find((r) => r.id === recipe.id);
    if (exists) {
      await deleteDoc(doc(db, "recipes", exists.docId));
      setSavedRecipes(savedRecipes.filter((r) => r.id !== recipe.id));
    } else {
      const docRef = await addDoc(collection(db, "recipes"), {
        ...recipe,
        userId: user.uid,
      });
      setSavedRecipes([...savedRecipes, { ...recipe, docId: docRef.id }]);
    }
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
        <div className="logo" onClick={() => navigate("/")}>
          Fresh Picks
        </div>
        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/recipes")}>Recipes</span>
          <span onClick={() => navigate("/mealplans")}>Meal Plans</span>
          <span onClick={() => navigate("/community")}>Community</span>
          {/* <span className="user-icon" onClick={handleLogout}>👤</span> */}
          <div className="profile-dropdown">
            <span
              className="user-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              👤
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home onToggleSave={handleToggleSave} savedRecipes={savedRecipes} />
          }
        />
        <Route
          path="/recipes"
          element={
            <SavedRecipes
              savedRecipes={savedRecipes}
              onToggleSave={handleToggleSave}
            />
          }
        />
        <Route path="/mealplans" element={<MealPlans />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </>
  );
}

export default App;
