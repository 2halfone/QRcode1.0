import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import "bootstrap/dist/css/bootstrap.min.css";

export default function GenerateQR() {
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    const generateQR = () => {
      const userEmail = "utente@example.com"; // 🔹 Sostituisci con l'email dell'utente loggato
      const expirationTime = Date.now() + 5 * 60 * 1000; // 🔹 Scade tra 5 minuti
      const token = btoa(`${userEmail}:${expirationTime}`); // 🔐 Crea un codice sicuro

      setQrValue(`https://miosito.com/auth/qr-login?token=${token}`);
    };

    generateQR();
    const interval = setInterval(generateQR, 60000); // 🔄 Genera un nuovo QR ogni 60 secondi

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Scansiona il QR Code per accedere</h1>
      {qrValue && <QRCode value={qrValue} size={200} />}
    </div>
  );
}
