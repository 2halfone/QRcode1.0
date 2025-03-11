"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importa useRouter
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import QRCode from "qrcode.react";

export default function Home() {
  const router = useRouter(); // Inizializza useRouter
  const [user, setUser] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Reindirizza alla pagina di login all'avvio del server
    router.replace("/auth/login");
  }, [router]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
  
      if (!userData) {
        throw new Error("Autenticazione non riuscita.");
      }
  
      await addDoc(collection(db, "logins"), {
        email: userData.email,
        timestamp: serverTimestamp(),
      });
  
      setUser(userData);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        alert("⚠️ Hai chiuso il popup di accesso prima di completarlo. Riprova.");
      } else {
        console.error("Errore durante il login:", error);
        alert("Errore durante l'accesso: " + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white p-10 rounded-xl shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">Sistema Presenze QR Code</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {!user ? (
          <button onClick={handleLogin} className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition">
            Accedi con Google
          </button>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Benvenuto, {user.displayName}</h2>
            <p className="mb-4">Scannerizza il tuo QR Code per registrare la presenza:</p>
            <div className="flex justify-center p-4 bg-gray-200 rounded-lg">
              <QRCode value={qrCodeValue} size={200} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
