// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";





export const firebaseConfig = {
      apiKey: "AIzaSyCxkcvGS_WvONZRNky8ZzTpceO1t1lutEs",
  authDomain: "pulse-fitness-bfac0.firebaseapp.com",
  projectId: "pulse-fitness-bfac0",
  storageBucket: "pulse-fitness-bfac0.firebasestorage.app",
  messagingSenderId: "703836724917",
  appId: "1:703836724917:web:8fbc2913d36f3a578aa8fc",
  measurementId: "G-0QGZKG29KN"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;