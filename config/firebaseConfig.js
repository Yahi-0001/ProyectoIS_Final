// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuuF7MCIfV2mgs6h6Ltr2YBX1YiBk8vnE",
  authDomain: "ansiedad-32f32.firebaseapp.com",
  projectId: "ansiedad-32f32",
  storageBucket: "ansiedad-32f32.appspot.com",
  messagingSenderId: "1050461672202",
  appId: "1:1050461672202:web:a6e0b16a0bb51b054fe0f3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);



