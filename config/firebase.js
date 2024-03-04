// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzJ5RLrMR6TuqMVjOSymCWicFbJ-W4Vjg",
  authDomain: "blockchain-b019d.firebaseapp.com",
  projectId: "blockchain-b019d",
  storageBucket: "blockchain-b019d.appspot.com",
  messagingSenderId: "984697903455",
  appId: "1:984697903455:web:b4b77ad9f009a990af7eea",
  measurementId: "G-F210LKF1W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default db;
export { app, auth };


