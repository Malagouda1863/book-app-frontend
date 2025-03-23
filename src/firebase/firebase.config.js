// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxu26for4HQgQyyiiunzf2O9HewznhwbI",
  authDomain: "book-store-mern-app-bc62a.firebaseapp.com",
  projectId: "book-store-mern-app-bc62a",
  storageBucket: "book-store-mern-app-bc62a.firebasestorage.app",
  messagingSenderId: "106557814299",
  appId: "1:106557814299:web:cfe506bf5c48657dd5aabe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);