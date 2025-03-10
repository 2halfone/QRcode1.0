import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from "../../styles/login.module.css"; // Usa il CSS Module

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError("⚠️ User not found. Check your email.");
          break;
        case 'auth/wrong-password':
          setError("⚠️ Incorrect password. Try again.");
          break;
        default:
          setError("⚠️ Error during login. Try again.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleEmailLogin} className="w-100">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
            className={`form-control mb-3 ${styles.input}`}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            required
            className={`form-control mb-3 ${styles.input}`}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={styles.button}
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-3">
          <Link href="/auth/resetpassw">
            <motion.span className={styles.forgotButton} whileHover={{ scale: 1.05 }}>
              Forgot your password?
            </motion.span>
          </Link>
        </p>

        <p className="text-center mt-3">Don't have an account?</p>
        <Link href="/register/register">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className={styles.registerButton}
            style={{ width: "60%", maxWidth: "250px" }} // ✅ Accorciato direttamente in JS
          >
            Register
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
