import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import OfficeIcon from "../assets/office-computer-table.svg";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { motion } from 'framer-motion';
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { MdEmail } from "react-icons/md"; // Import MdEmail for email icon
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri"; // Ensure these icons are imported

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  // Check if user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigate('/dashboard');
        } else {
          setError('Your email is not verified. Please check your inbox.');
          signOut(auth);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCurrentUser(user);

      if (user.emailVerified) {
        navigate('/dashboard');
      } else {
        setShowVerificationModal(true);
      }
    } catch (error) {
      setError(error.message);
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setCurrentUser(user);

      if (user.emailVerified) {
        navigate('/dashboard');
      } else {
        setShowVerificationModal(true);
      }
    } catch (error) {
      setError(error.message);
      console.error("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen max-w-screen-lg bg-white grid grid-cols-[auto,1fr] justify-items-center mx-auto items-center pb-32">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-10 items-left min-w-[26rem] max-w-full ml-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-3xl font-extrabold text-left mb-12 text-gray-800">
          Login
        </h1>
        <div className="mb-4 flex flex-row items-center min-w-full py-3 border-b-2 border-gray-400">
          <span className="pr-2">
            <MdEmail />
          </span>
          <motion.input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-2"
            required
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
          />
        </div>
        <div className="mb-4 flex flex-row gap-2 items-center py-3 min-w-full border-b-2 border-gray-400 w-full">
          <span>
            <RiLockPasswordFill />
          </span>
          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-2"
            required
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-between mb-8">
          <Link to="/forgot-password" className="text-blue-500 underline">Forgot Password?</Link>
        </div>

        <motion.button
          type="submit"
          className="bg-blue-400 text-white py-3 px-8 rounded-lg hover:bg-blue-300 transition-colors duration-300 shadow-lg font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          Login
        </motion.button>
      </motion.form>
      <div className="flex flex-col justify-items-center gap-4 align-center text-center sm:block">
        <img alt="OfficeIcon" src={OfficeIcon} className="mb-6" />
        <p>
          <Link to="/register" className="underline hover:text-slate-400">
            I am not a member yet
          </Link>
        </p>
        <p>or</p>
        <motion.button
          onClick={handleGoogleLogin}
          className="bg-white border border-gray-300 py-3 px-8 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors duration-300 shadow-lg font-semibold"
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </motion.button>
      </div>
    </div>
  );
}
