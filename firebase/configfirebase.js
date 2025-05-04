/* global process */
// This file initializes Firebase for use in the application.
// It sets up the Firebase app using environment variables and exports the Firestore database instance.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object populated from environment variables.
// These should be defined in a .env.local file at the root of the project (not committed to version control).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // Public API key for Firebase project
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // Auth domain for Firebase Authentication
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // Unique Firebase project ID
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Cloud Storage bucket
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // Messaging sender ID
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // App ID for Firebase project
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Get Firestore instance from the initialized app
const db = getFirestore(app);

// Export Firestore instance for use in the rest of the application
export { db };
