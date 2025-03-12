
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABjf0T2IRLzJOq27yxOBsmX_reM7Peyqw",
  authDomain: "registro-presenze-426f3.firebaseapp.com",
  projectId: "registro-presenze-426f3",
  storageBucket: "registro-presenze-426f3.firebasestorage.app",
  messagingSenderId: "627168360974",
  appId: "1:627168360974:web:62b49b80257af4bd051a5f"
};
// 🔹 Se l'app non è già inizializzata, la inizializza
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;