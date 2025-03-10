// pages/auth/login.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/login.module.css";
import QRCodeDisplay from "../../components/QRCodeDisplay";

export default function Login() {
  const router = useRouter();
  // Modalità QR attivata di default in questa pagina
  const [useQR, setUseQR] = useState(true);
  const [width, setWidth] = useState(0);

  // Aggiorna la larghezza della finestra per layout responsive
  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Stili inline per la struttura (i colori e altri stili base sono definiti nel CSS)
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "1rem"
  };

  const loginBoxStyle = {
    minHeight: "500px"
  };

  const contentStyle = {
    display: "flex",
    flexDirection: width < 768 ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem"
  };

  const qrColumn = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width < 768 ? "1rem" : 0,
    width: width < 768 ? "100%" : "auto"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={containerStyle}
      className={styles.container}
    >
      <div style={loginBoxStyle} className={styles.loginBox}>
        <h1 className={styles.title}>Login via QR Code</h1>
        {/* Link per passare al login manuale */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Link href="/auth/manualLogin">
            <span className="btn btn-secondary">Usa Login Manuale</span>
          </Link>
        </div>
        <div style={contentStyle} className={styles.content}>
          <div style={qrColumn} className={styles.qrColumn}>
            <QRCodeDisplay />
          </div>
        </div>
        <p className={styles.textCenter}>
          <Link href="/auth/resetpassw">
            <span className={styles.forgotButton}>
              Password dimenticata?
            </span>
          </Link>
        </p>
        <p className={styles.textCenter}>Non hai un account?</p>
        <div className={styles.textCenter}>
          <Link href="/register/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.registerButton}
              style={{ width: "60%", maxWidth: "250px" }}
            >
              Registrati
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
