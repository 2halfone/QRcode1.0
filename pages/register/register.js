import { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from "../../utils/firebase";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../../styles/register.module.css"; // Usa il CSS Module

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError("⚠️ Email already in use. Try another one.");
          break;
        case 'auth/invalid-email':
          setError("⚠️ Invalid email. Check your email.");
          break;
        case 'auth/weak-password':
          setError("⚠️ Weak password. Try a stronger one.");
          break;
        default:
          setError("⚠️ Error during registration. Try again.");
      }
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Rimuove il messaggio di errore appena l'utente inizia a scrivere
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <div className={styles.registerBox} style={{ height: '600px' }}> {/* Allunga la forma del quadrato */}
        <h1 className={styles.title}>Register</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleEmailRegister} className="w-100 d-flex flex-column align-items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
            className={`form-control mb-3 ${styles.input}`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
            className={`form-control mb-3 ${styles.input}`}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className={styles.button}
            style={{ width: '50%', background: 'linear-gradient(to right, #007bff, #0056b3)' }} // Accorciato della metà e colore sfumato
          >
            Register
          </motion.button>
        </form>

        <p className="text-center mt-3">Or</p>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/auth/login" legacyBehavior>
            <a className={styles.link}>Login</a>
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
