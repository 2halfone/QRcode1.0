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
        <h1 className={styles.title}>Absent</h1>
        <form onSubmit={handleAbsentSubmit} className="w-100">
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
          <motion.button type="submit" className={`${styles.button} w-50`}>
            Submit
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}