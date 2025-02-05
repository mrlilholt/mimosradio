// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC241Ewcs8_q4OMSiNtcjg5VngzuA-tu8",
  authDomain: "mimos-radio.firebaseapp.com",
  projectId: "mimos-radio",
  storageBucket: "mimos-radio.firebasestorage.app",
  messagingSenderId: "685299614798",
  appId: "1:685299614798:web:18bd362285993f944f6f1f",
  measurementId: "G-5X4GWN5770"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
