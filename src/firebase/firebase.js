// src/firebase.js
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database"; // <-- Realtime Database

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpAkocrmKESVtrzYdt8gyYgoDloGBbnqY",
  authDomain: "binguard-85437.firebaseapp.com",
  databaseURL: "https://binguard-85437-default-rtdb.firebaseio.com",
  projectId: "binguard-85437",
  storageBucket: "binguard-85437.appspot.com",
  messagingSenderId: "552192073278",
  appId: "1:552192073278:web:4c2896f5a1978e4521bb6f",
  measurementId: "G-M4PXYWPXML",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app); // <-- Realtime Database
const googleProvider = new GoogleAuthProvider();

// Define Logout properly
const Logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (err) {
    console.error("Logout failed:", err.message);
  }
};

// Export all Firebase functions
export {
  app,
  auth,
  db,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  Logout,
};
