import { useState } from "react";
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from "../../styles/resetpassword.module.css"; // ✅ Use the CSS Module

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
      setMessage("✅ Reset email sent successfully!");
    } catch (error) {
      setError("⚠️ Error sending reset email. Please try again.");
    }
  };
  console.log("Bootstrap is applied:", typeof window !== "undefined" && !!document.querySelector('.btn'));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <div className={`${styles.resetBox} shadow-lg`}>
        <h1 className={styles.title}>Reset Password</h1>

        {message && <div className="alert alert-success text-center">{message}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleResetPassword} className="w-100">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); setMessage(""); }}
            required
            className={`form-control mb-3 ${styles.input}`}
          />
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className={styles.button}
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
