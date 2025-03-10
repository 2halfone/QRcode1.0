import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { auth, createUserWithEmailAndPassword } from '../../utils/firebase';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error) {
      toast.error("Error registering. Is the email already in use?");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="d-flex flex-column align-items-center justify-content-center vh-100 p-4"
      style={{ background: "linear-gradient(to right, #ff7f50, #ff6347, #ff4500, #ff1493, #ff69b4)" }}
    >
      <div className="rounded p-4 shadow-lg w-100" style={{ background: "linear-gradient(145deg, #ffffff, #e6e6e6)", maxWidth: "440px", height: "440px", paddingTop: "30px", paddingBottom: "30px", boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff" }}>
        <h1 className="mb-4 text-center">Register</h1>
        <form onSubmit={handleEmailRegister} className="w-100">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control mb-3"
            style={{ backgroundColor: "#fff", color: "#000", borderColor: "#ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control mb-3"
            style={{ backgroundColor: "#fff", color: "#000", borderColor: "#ccc" }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="btn btn-primary btn-sm w-50 mb-3 mx-auto d-block"
            style={{ borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            Register
          </motion.button>
        </form>
        <p className="mb-3 text-center">Or</p>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
