import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Our firestore config
const firebaseConfig = {
  apiKey: 'AIzaSyBER_qY_YVlj-ICbnuOGwHQLsvEpmMuX54',
  authDomain: 'mola-fd783.firebaseapp.com',
  projectId: 'mola-fd783',
  storageBucket: 'mola-fd783.appspot.com',
  messagingSenderId: '737935796035',
  appId: '1:737935796035:web:17ca9a717837e59ba7b1f6',
};

const app = initializeApp(firebaseConfig); // Initialize Firebase
const db = getFirestore(app); // Initialize Firestore

export { db };
