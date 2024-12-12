// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";





export const firebaseConfig = {
       apiKey: "AIzaSyBgmyhu9YSy7otS5qRcO1_zUnuPmASmgec",
  authDomain: "fitness-club-29c91.firebaseapp.com",
  projectId: "fitness-club-29c91",
  storageBucket: "fitness-club-29c91.firebasestorage.app",
  messagingSenderId: "353731357947",
  appId: "1:353731357947:web:d4e04d20d43324e80bd45e",
  measurementId: "G-7LL9921P7N"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;