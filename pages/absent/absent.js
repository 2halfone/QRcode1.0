import { useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import styles from "../../styles/login.module.css";

export default function Absent() {
  const router = useRouter();
  const [reason, setReason] = useState("");

  const handleAbsentSubmit = (e) => {
    e.preventDefault();
    // Handle the absence submission logic here
    console.log("Reason for absence:", reason);
    router.push("/dashboard");

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      router.replace("/auth/login");
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className={`${styles.loginBox} card shadow-lg`}
      >
        <motion.h1
          className={`${styles.title} card-title`}
          style={{ fontSize: "2.5rem" }}
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
        >
          Absent
        </motion.h1>
        <motion.form
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
          onSubmit={handleAbsentSubmit}
          className="w-100"
        >
          <div className="form-group mb-3">
            <label htmlFor="reason" className="form-label">Select Reason for Absence</label>
            <select
              id="reason"
              className={`form-control ${styles.input}`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="" disabled>Select a reason</option>
              <option value="sick">Sick</option>
              <option value="vacation">Vacation</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
          <motion.button
            type="submit"
            className={`${styles.button} w-50`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}