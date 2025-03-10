// pages/auth/login.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "../../utils/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/login.module.css";

export default function Login() {
  const router = useRouter();
  // Imposta a false per mostrare il form manuale per default
  const [useQR, setUseQR] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const [caricamento, setCaricamento] = useState(false);
  const [larghezza, setLarghezza] = useState(0);

  // Imposta la larghezza della finestra per il layout responsive
  useEffect(() => {
    const aggiornaLarghezza = () => setLarghezza(window.innerWidth);
    aggiornaLarghezza();
    window.addEventListener("resize", aggiornaLarghezza);
    return () => window.removeEventListener("resize", aggiornaLarghezza);
  }, []);

  // Stili inline per il layout, mantenendo i colori originali definiti nel CSS
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "1rem"
  };

  const loginBoxStyle = {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
    boxSizing: "border-box",
    minHeight: "500px"
  };

  const contentStyle = {
    display: "flex",
    flexDirection: larghezza < 768 ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem"
  };

  const formColumnStyle = {
    flex: 1,
    padding: "1rem"
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
          Login
        </h1>
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setUseQR(!useQR)}
        >
          {useQR ? "Usa Login con Email" : "Usa Login con QR Code"}
        </button>
        <div style={contentStyle} className={styles.content}>
          {useQR ? (
            // Se in modalità QR, qui inseriresti il componente per il QR (se lo volessi)
            <div style={{ flex: 1, textAlign: "center" }}>
              <p>Modalità QR attiva</p>
            </div>
          ) : (
            <div style={formColumnStyle} className={styles.formColumn}>
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
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          <Link href="/auth/resetpassw">Password dimenticata?</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          Non hai un account?
        </p>
        <div style={{ textAlign: "center" }}>
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
