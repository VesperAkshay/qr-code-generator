import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { motion } from 'framer-motion';
import { useAuth } from "../context/AuthContext";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [emailAuthVerified, setEmailAuthVerified] = useState(false);
  const [googleAuthVerified, setGoogleAuthVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  // Check if user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in and their email is verified, redirect to dashboard
        if (user.emailVerified) {
          navigate('/dashboard');
        } else {
          // If user is signed in but not verified, log them out and show error
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
        setEmailAuthVerified(true);
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
        setGoogleAuthVerified(true);
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

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent! Please check your inbox.');
      setShowVerificationModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-800">Welcome Back</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-6">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full font-semibold p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
            whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          />
        </div>
        <div className="mb-8 relative">
          <motion.input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full font-semibold p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
            whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          />
          <span 
            className="absolute right-4 top-4 cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <motion.button
          type="submit"
          className={`w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={{ scale: 1.05 }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </motion.button>
        <motion.button
          type="button"
          onClick={handleGoogleLogin}
          className={`w-full mt-6 bg-slate-100 text-black p-4 rounded-lg hover:bg-gray-200 transition-colors duration-150 shadow-lg flex items-center justify-center font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={{ scale: 1.05 }}
          disabled={loading}
        >
          <FcGoogle className="mr-2 size-8" />
          Sign in with <span className="font-bold ml-1"> Google</span>
        </motion.button>
      </motion.form>

      {showVerificationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Email Verification Required</h2>
            <p className="mb-4">Your email address is not verified. Please verify your email to continue.</p>
            <button
              onClick={handleSendVerificationEmail}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg font-semibold"
            >
              Resend Verification Email
            </button>
            <button
              onClick={() => setShowVerificationModal(false)}
              className="w-full mt-3 bg-gray-200 text-black p-3 rounded-lg hover:bg-gray-300 transition-colors duration-150 shadow-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
