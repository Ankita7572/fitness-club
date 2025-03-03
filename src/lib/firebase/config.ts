// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";





export const firebaseConfig = {
      apiKey: process.env.NEXT_APP_API_KEY,
  authDomain: process.env.NEXT_APP_AUTH_DOMAIN,
  projectId: process.env.NEXT_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_STORAGE_BUCKET",
  messagingSenderId: process.env.NEXT_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: "process.env.NEXT_APP_MEASUREMENTID
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
