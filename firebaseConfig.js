import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs9JNVy5GNwFhY4P9qZUFie378ceeNOgY",
  authDomain: "registro-presenze-e5066.firebaseapp.com",
  projectId: "registro-presenze-e5066",
  storageBucket: "registro-presenze-e5066.firebasestorage.app",
  messagingSenderId: "62480357103",
  appId: "1:62480357103:web:746b4eca2853a3f3372d1a"
};
// ✅ Verifica se Firebase è già stato inizializzato per evitare errori di duplicazione
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);