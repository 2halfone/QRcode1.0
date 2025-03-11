import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/dashboard.module.css"; // Usa il CSS Module

export default function Dashboard() {
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

  const dashboardBoxStyle = {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "80%",
    maxWidth: "800px",
    boxSizing: "border-box",
    minHeight: "600px"
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
      <div style={dashboardBoxStyle} className={styles.dashboardBox}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.8rem" }}>
          Dashboard
        </h1>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <Link href="/auth/manualLogin">
            <span className="btn btn-secondary">Manual Login</span>
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <QRCode value="https://example.com" />
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem" }}>
          <Link href="/auth/resetpassw">Forgot Password?</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem" }}>
          Don't have an account?
        </p>
        <div style={{ textAlign: "center" }}>
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
        </div>
      </div>
    </motion.div>
  );
}
