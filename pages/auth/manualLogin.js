// pages/auth/manualLogin.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "../../utils/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/login.module.css";

export default function ManualLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const [caricamento, setCaricamento] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrore("");
    setCaricamento(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setErrore("⚠️ Utente non trovato. Controlla l'email.");
          break;
        case "auth/wrong-password":
          setErrore("⚠️ Password errata. Riprova.");
          break;
        default:
          setErrore("⚠️ Errore durante il login. Riprova.");
      }
    } finally {
      setCaricamento(false);
    }
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
        <h1 className={styles.title} style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.75rem" }}>
          Login Manuale
        </h1>
        {/* Link per tornare al login con QR Code */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Link href="/auth/login">
            <span className="btn btn-secondary">Usa Login con QR Code</span>
          </Link>
        </div>
        <form onSubmit={handleEmailLogin}>
          {errore && (
            <div className="alert alert-danger text-center">{errore}</div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control mb-2"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrore("");
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control mb-2"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrore("");
              }}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={styles.button}
            disabled={caricamento}
          >
            {caricamento ? "Accesso in corso..." : "Accedi"}
          </motion.button>
        </form>
        <p className={styles.textCenter} style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          <Link href="/auth/resetpassw">Password dimenticata?</Link>
        </p>
        <p className={styles.textCenter} style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Non hai un account?
        </p>
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
