// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASWr1g7Ma2Q7-zLZVss_NMycEoW3EgbJ4",
  authDomain: "workoutapp-c2d9d.firebaseapp.com",
  projectId: "workoutapp-c2d9d",
  storageBucket: "workoutapp-c2d9d.appspot.com",
  messagingSenderId: "263940355521",
  appId: "1:263940355521:web:3e77a3e3e02d271cfbeb40",
  measurementId: "G-PLGB2XV2XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app) 
export const auth = getAuth(app);