import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb9hMwO2O4TZzm2rGFmcyiVWHOa8Sw9S8",
  authDomain: "mind-sathi-71fee.firebaseapp.com",
  projectId: "mind-sathi-71fee",
  storageBucket: "mind-sathi-71fee.firebasestorage.app",
  messagingSenderId: "991845540837",
  appId: "1:991845540837:web:eec8cd2d90e0bad454c50c",
  measurementId: "G-849VFJ1WHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// You can also export the app instance if needed
export default app;