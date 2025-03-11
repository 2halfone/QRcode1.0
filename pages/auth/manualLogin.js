import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";
import { useRouter } from "next/router";
import { registraLogin } from "../../utils/firestore"; // ✅ Importa la funzione di Firestore
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/login.module.css"; // ✅ Importa il file CSS del login

function ManualLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Registra il login in Firestore dopo un login riuscito
      await registraLogin(user.uid, user.email);

      // ✅ Reindirizza alla dashboard
      router.replace("/dashboard");
    } catch (error) {
      setError("⚠️ Errore durante il login. Riprova.");
    }
  };

  return (
    <motion.div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleEmailLogin} className="w-100">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={`form-control mb-3 ${styles.input}`} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={`form-control mb-3 ${styles.input}`} />
          <motion.button type="submit" className={styles.button}>
            Login
          </motion.button>
        </form>

        <p className="text-center mt-3">
          <Link href="/auth/resetpassw">
            <motion.span className={styles.forgotButton} whileHover={{ scale: 1.05 }}>
              Password dimenticata?
            </motion.span>
          </Link>
        </p>

        <p className="text-center mt-3">Non hai un account?</p>
        <Link href="/register/register">
          <motion.button className={styles.registerButton}>Registrati</motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

// ✅ Esporta il componente correttamente
export default ManualLogin;
