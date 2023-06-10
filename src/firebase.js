// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHOfy5Msco7NerENhkMCKtW6itkU6FNrU",
  authDomain: "buybusy-2.firebaseapp.com",
  projectId: "buybusy-2",
  storageBucket: "buybusy-2.appspot.com",
  messagingSenderId: "285334556552",
  appId: "1:285334556552:web:5b055edc8920355a0bf43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth,db}