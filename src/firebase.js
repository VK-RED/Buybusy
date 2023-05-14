import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"

import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,onAuthStateChanged,
        signOut,
      }     from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAbjqwzbs6RxQPWkA-tAmhwcb51eRLUajo",
  authDomain: "buybusy-efeb3.firebaseapp.com",
  projectId: "buybusy-efeb3",
  storageBucket: "buybusy-efeb3.appspot.com",
  messagingSenderId: "849088228179",
  appId: "1:849088228179:web:760835d2f7f809f77d0fa6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{auth,
      db,
      getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      onAuthStateChanged,
      signOut,
      
    }