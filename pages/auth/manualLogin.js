import { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/login.module.css"; // ✅ Import the login CSS file

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

      // ✅ Log the login in Firestore after a successful login
      await logLogin(user.uid, user.email);

      // ✅ Redirect to the dashboard
      router.replace("/dashboard");
    } catch (error) {
      setError("⚠️ Error during login. Please try again.");
    }
  };

  return (
    <motion.div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Manual Login</h1>
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <Link href="/auth/login">
            <span className="btn btn-secondary">Login via QR Code</span>
          </Link>
        </motion.div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleEmailLogin} className="w-100">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={`form-control mb-3 ${styles.input}`} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={`form-control mb-3 ${styles.input}`} />
          <motion.button type="submit" className={`${styles.button} w-50`}>
            Login
          </motion.button>
        </form>

        <p className="text-center mt-3">
          <Link href="/auth/resetpassw">
            <motion.span className={styles.forgotButton} whileHover={{ scale: 1.05 }}>
              Forgot Password?
            </motion.span>
          </Link>
        </p>

        <p className="text-center mt-3">Don't have an account?</p>
        <Link href="/register/register">
          <motion.button className={`${styles.registerButton} w-50`}>
            Register
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

// ✅ Export the component correctly
export default ManualLogin;
