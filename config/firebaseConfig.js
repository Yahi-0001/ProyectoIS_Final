// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuuF7MCIfV2mgs6h6Ltr2YBX1YiBk8vnE",
  authDomain: "ansiedad-32f32.firebaseapp.com",
  projectId: "ansiedad-32f32",
  storageBucket: "ansiedad-32f32.firebasestorage.app",
  messagingSenderId: "1050461672202",
  appId: "1:1050461672202:web:a6e0b16a0bb51b054fe0f3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

