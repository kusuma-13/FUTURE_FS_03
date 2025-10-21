// my-app/lib/firebase.js 

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  // Accessing variables via process.env.NEXT_PUBLIC_...
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // Note: Messaging Sender ID is often optional for frontend-only use
};

// Initialize Firebase and export the database
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);