import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/qrlogin.module.css"; // Stile personalizzato

export default function QRLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(async (decodedText) => {
      scanner.clear(); // Ferma lo scanner dopo la lettura
      validateQR(decodedText);
    });

    return () => scanner.clear(); // Pulisce lo scanner quando il componente viene smontato
  }, []);

  const validateQR = async (qrData) => {
    try {
      const url = new URL(qrData);
      const token = url.searchParams.get("token");

      if (!token) throw new Error("QR Code non valido!");

      const decodedToken = atob(token); // 🔓 Decodifica il token
      const [email, expirationTime] = decodedToken.split(":");

      if (Date.now() > parseInt(expirationTime)) {
        throw new Error("⚠️ QR Code scaduto! Generane uno nuovo.");
      }

      // ✅ Login automatico con Firebase usando l'email
      await signInWithEmailAndPassword(auth, email, "defaultpassword");
      router.replace("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login con QR Code</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div id="qr-reader" className={styles.qrScanner}></div>
    </div>
  );
}
