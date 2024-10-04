import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
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
        <div className="mb-8">
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full font-semibold p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
            whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          Login
        </motion.button>
        <motion.button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-6 bg-slate-100 text-black p-4 rounded-lg hover:bg-gray-200 transition-colors duration-150 shadow-lg flex items-center justify-center font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          <FcGoogle className="mr-2 size-8" />
          Sign in with <span className="font-bold ml-1"> Google</span>
        </motion.button>
      </motion.form>
    </div>
  );
}
