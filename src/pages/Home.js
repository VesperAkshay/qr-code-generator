import React from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaSignInAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
      <motion.div 
        className="text-center p-8 bg-white bg-opacity-90 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="mx-auto text-gray-800 text-6xl mb-4"
          initial={{ rotate: -45 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <FaQrcode />
        </motion.div>
        <motion.h1
          className="text-5xl font-extrabold mb-6 text-gray-900"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Welcome to the QR Code Generator
        </motion.h1>
        <motion.p
          className="text-lg mb-8 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Create and customize your own QR codes easily.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            to="/login"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
