import { QRCode } from "react-qr-code";
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
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundImage: "url('/path/to/sky-and-clouds.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container bg-white p-4 rounded shadow-sm text-center" style={{ maxWidth: "600px", backdropFilter: "blur(10px)", backgroundImage: "url('/path/to/flower.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <motion.h1 className="mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Benvenuto nella Dashboard
        </motion.h1>
        <motion.p className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          Questa è la tua dashboard. Da qui puoi gestire la tua app.
        </motion.p>
      </div>
    </motion.div>
  );
}
