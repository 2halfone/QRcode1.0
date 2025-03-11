import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
    >
      <div className="container bg-white p-4 rounded shadow-sm text-center" style={{ maxWidth: "600px" }}>
        <h1 className="mb-3">Benvenuto nella Dashboard</h1>
        <p className="mb-4">Questa è la tua dashboard. Da qui puoi gestire la tua app.</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mx-2" onClick={() => router.push("/profile")}>Profilo</button>
          <button className="btn btn-danger mx-2" onClick={() => router.push("/logout")}>Logout</button>
        </div>
      </div>
    </motion.div>
  );
}
