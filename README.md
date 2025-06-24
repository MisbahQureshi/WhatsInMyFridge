# 🥦 What's in My Fridge (a.k.a. Fresh Picks)

A smart recipe suggestion web app that helps users decide *"What should I cook today?"* based on what’s already in their fridge. Users can select ingredients they currently have, and the app provides real-time recipe suggestions using AI and the Spoonacular API. Built with modern web technologies, authenticated via Google Login, and deployed with AWS Amplify.

> Developed by Misbah Qureshi

---

## 🚀 Live Demo

🔗 [Try it now on AWS Amplify](https://main.d2iyquvybx2yj7.amplifyapp.com/)

---

## 🧠 Project Motivation

As a student managing both studies and daily life, meal planning can become overwhelming. This app was born to simplify that decision by suggesting easy-to-cook meals using ingredients already available at home.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Routing:** React Router DOM
- **Authentication:** Firebase (Google Login)
- **Recipe API:** Spoonacular API
- **AI:** ChatGPT-4o (OpenAI) for code generation and assistance
- **Hosting + CI/CD:** AWS Amplify
- **Version Control:** Git + GitHub

---

## ✨ Features

- ✅ **Google Login** via Firebase
- ✅ **Ingredient Selector**: Choose from checkboxes or type custom ingredients
- ✅ **Live Recipe Suggestions** using Spoonacular API
- ✅ **Bookmark Recipes** with Save/Unsave toggle
- ✅ **Saved Recipes Page** to view favorites
- ✅ **Ask Ai for More Customized Recipe Suggestions** to view favorites
- ✅ **Responsive UI** with clean navigation and dropdown profile menu
- ✅ **Secure API Keys** via Amplify environment variables

---

## 📦 Installation Instructions

To run this project locally:

```bash
git clone https://github.com/MisbahQureshi/whats-in-my-fridge.git
cd whats-in-my-fridge
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

- `npm start` – Launch dev server
- `npm run build` – Create optimized production build
- `npm test` – Run test suite

---

## 📈 Development Timeline (Highlights)

### Week 1
- Built basic React UI with ingredient selection and Spoonacular integration
- Set up Google Login via Firebase
- Displayed recipe cards with missing/used ingredient details

### Week 2
- Redesigned UI for a modern, clean layout
- Implemented React Router navigation
- Added hover effects and dropdown profile/logout

### Week 3
- Added “Save to Recipes” bookmarking with visual icon toggle
- Created `/recipes` page to show saved items
- Refined state sharing and routing logic

### Week 4
- Integrated Ai Recipe Suggestions 
- Deployed full app to AWS Amplify
- Configured Firebase auth domains and Amplify environment variables
- Debugged deployment issues (axios, node version, domain)

---

## 🧠 AI Collaboration

ChatGPT-4o was used extensively for:
- UI improvements (CSS, layout)
- Debugging React/Amplify integration

## 📌 Future Plans

- Add **Meal Planner** feature
- Add **Grocery Generator** feature
- Enable persistent recipe saving using Firebase Firestore

---

## 🙌 Acknowledgements

- [Spoonacular API](https://spoonacular.com/food-api)
- [Firebase Authentication](https://firebase.google.com/)
- [AWS Amplify Hosting](https://docs.amplify.aws/)
- [ChatGPT by OpenAI](https://openai.com/)

---

## 🧾 License

This project is for academic use and demonstration purposes. Free to explore, fork, and build upon!