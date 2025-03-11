import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const registraLogin = async (userId, email) => {
  try {
    await addDoc(collection(db, "logins"), {
      userId,
      email,
      timestamp: serverTimestamp(),
    });
    console.log("✅ Login registrato in Firestore!");
  } catch (error) {
    console.error("❌ Errore nel salvataggio del login:", error);
  }
};
