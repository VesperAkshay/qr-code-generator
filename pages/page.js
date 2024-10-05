"use client";

import React from "react";
import { Link } from "react-router-dom";
import { FaQrcode, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
      <motion.div
        className="text-center p-8 bg-white bg-opacity-90 rounded-3xl shadow-2xl max-h-screen overflow-y-scroll"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-lg text-gray-700 mb-4">
              💡 <span className="font-semibold">Why use QR Codes?</span>
            </p>
            <p className="text-md text-gray-600">
              QR codes are a versatile tool for businesses and personal use.
              They can link to websites, contact information, and even payment options. With our tool, you can create custom QR codes that match your brand and style.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">I’m new to QR Codes. What should I know?</h2>
            <p className="text-md text-gray-600 mb-4">
              QR Code is a two-dimensional version of the barcode, typically made up of black and white pixel patterns. It was developed to accelerate logistics processes for automobile production. Now, it has found its way into mobile marketing.
            </p>
            <Link to="/more-info" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline">
              Tell me more
            </Link>
          </motion.div>

          <motion.div
            className="col-span-1 md:col-span-2 flex justify-center my-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          >
            <Link
              to="/login"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
          </motion.div>

          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How do I create a free QR Code?</h2>
            <p className="text-md text-gray-600 mb-4">We’ll show you how in just three simple steps:</p>
          </motion.div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Select which type</h3>
            <p className="text-md text-gray-600 mb-4">
              You may choose from URL, vCard, Plain Text, WiFi. However, these free QR Codes are not editable and trackable.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Fill in the details</h3>
            <p className="text-md text-gray-600 mb-4">
              Enter all the information needed in the fields that appear. This could be a link, contact information, text, or any other type of info. Once you’re done, select “Generate.”
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Download the QR Code</h3>
            <p className="text-md text-gray-600 mb-4">
              You may choose to have a standard black and white design or choose colors and frames to help you attract more scans. If not, proceed to download your finished Code.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 col-span-1 md:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
        >
          <p className="text-sm text-gray-500 mb-4">
            Pro Tip: You can install this app on your mobile device by using Chrome's "Add to Home Screen" feature for quick access! 
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Explore the endless possibilities with QR codes, from simplifying your business operations to enhancing your marketing efforts.
          </p>
          <p className="text-sm text-gray-500">
            Don't have an account? 
            <Link to="/register" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline ml-1">Sign up here</Link>.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
