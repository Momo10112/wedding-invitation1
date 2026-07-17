//====================================
// Firebase Configuration
//====================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLNraJ9lICsJ_Fzz21KO3WQzl0QA_uNCo",
  authDomain: "wedding-invitation-fe891.firebaseapp.com",
  projectId: "wedding-invitation-fe891",
  storageBucket: "wedding-invitation-fe891.firebasestorage.app",
  messagingSenderId: "411837763798",
  appId: "1:411837763798:web:3fa1025ec69c47b9013977"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };