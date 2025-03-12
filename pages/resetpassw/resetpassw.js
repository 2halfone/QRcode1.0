import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from "../../styles/resetpassw.module.css"; // Usa il CSS Module

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent successfully!");
      setTimeout(() => {
        router.replace("/auth/login");
      }, 2000); // Reindirizza alla pagina di login dopo 2 secondi
    } catch (error) {
      setError("⚠️ Error sending password reset email. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
      style={{ fontFamily: "'Roboto', sans-serif", background: 'linear-gradient(to right, #ff7f50, #ff6347, #ff4500, #ff1493, #ff69b4)' }} // Usa il font Roboto e cambia il colore di sfondo
    >
      <div className={styles.resetBox} style={{ height: '500px' }}>
        <h1 className={styles.title} style={{ color: '#333' }}>Reset Password</h1> {/* Cambia il colore del testo */}

        {message && <div className="alert alert-success text-center">{message}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleResetPassword} className="w-100">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); setMessage(""); }}
            required
            className={`form-control mb-3 ${styles.input}`}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className={styles.button}
            style={{ width: '40%' }} // Diminuisci la larghezza del bottone
          >
            Send Reset Email
          </motion.button>
        </form>

        <p className="text-center mt-3">
          <Link href="/auth/login">Back to Login</Link>
        </p>
      </div>
    </motion.div>
  );
}