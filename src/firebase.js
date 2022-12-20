// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEUelgQ7CQeVKTMZKfxnSOe90RqVInmDU",
  authDomain: "week-organize.firebaseapp.com",
  projectId: "week-organize",
  storageBucket: "week-organize.appspot.com",
  messagingSenderId: "724548107198",
  appId: "1:724548107198:web:42999ab26f193b921217ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);