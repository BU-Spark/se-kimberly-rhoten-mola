// Import Firebase and Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBER_qY_YVlj-ICbnuOGwHQLsvEpmMuX54",
  authDomain: "mola-fd783.firebaseapp.com",
  projectId: "mola-fd783",
  storageBucket: "mola-fd783.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "737935796035",
  appId: "1:737935796035:web:17ca9a717837e59ba7b1f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db };
