import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import QRCodeDisplay from "../../components/QRCodeDisplay";
import styles from "../../styles/login.module.css";

export default function Login() {
  const router = useRouter();
  const [width, setWidth] = useState(0);

  // Update window width for responsive layout
  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Inline styles for ensuring responsiveness and maintaining colors managed in CSS
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "1rem",
    flexDirection: width < 768 ? "column" : "row"
  };

  // Rectangle containing the login elements
  const loginBoxStyle = {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    boxSizing: "border-box",
    minHeight: "500px"
  };

  // Style for the section containing the QR code (centered)
  const qrColumnStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0.5rem", // Reduced margin
    width: "100%"
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
        <motion.h1
          style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.8rem" }}
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} // Increased duration to slow down the pulse effect
        >
          Login via QR Code
        </motion.h1>
        {/* Link to switch to manual login */}
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <Link href="/auth/manualLogin">
            <span className="btn btn-secondary">Use Manual Login</span>
          </Link>
        </motion.div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={qrColumnStyle}>
            <QRCodeDisplay />
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem" }}
        >
          <Link href="/auth/resetpassw" style={{ textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem" }}
        >
          Don't have an account?
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center" }}
        >
          <Link href="/register/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: "70%",
                maxWidth: "305px",
                padding: "1.05rem",
                fontSize: "1.3rem",
                cursor: "pointer"
              }}
              className="btn btn-primary"
            >
              Register
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}
        >
          <Link href="/absent/absent" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              className="btn btn-warning"
            >
              Absent
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}