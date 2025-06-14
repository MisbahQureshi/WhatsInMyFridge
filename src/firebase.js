// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC82NptcMl1B6ur8yR-w75Dqrh6gd3kB6A",
  authDomain: "whats-in-my-fridge-ae570.firebaseapp.com",
  projectId: "whats-in-my-fridge-ae570",
  storageBucket: "whats-in-my-fridge-ae570.firebasestorage.app",
  messagingSenderId: "917042624691",
  appId: "1:917042624691:web:33ac0252613edd29b358c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
