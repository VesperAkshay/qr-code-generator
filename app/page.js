"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaQrcode, FaSignInAlt } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { motion } from "framer-motion";
import TwitterLogo from "./assets/twitter.png";
import MetaLogo from "./assets/meta.png";
import InstagramLogo from "./assets/instagram.png";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const processStepCrads = [
    {
      heading: "1. Select which type",
      desc: "You may choose from URL, vCard, Plain Text, WiFi. However, these free QR Codes are not editable and trackable.",
    },
    {
      heading: "2. Fill in the details",
      desc: "Enter all the information needed in the fields that appear. This could be a link, contact information, text, or any other type of info. Once you’re done, select “Generate.”",
    },
    {
      heading: "3. Download the QR Code",
      desc: "You may choose to have a standard black and white design or choose colors and frames to help you attract more scans. If not, proceed to download your finished Code.",
    },
  ];

  const handleNavigation = () => {
    router.push(currentUser ? "/dashboard" : "/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-lg text-gray-700 mb-4">
              💡 <span className="font-semibold">Why use QR Codes?</span>
            </p>
            <p className="text-md text-gray-600">
              QR codes are a versatile tool for businesses and personal use.
              They can link to websites, contact information, and even payment
              options. With our tool, you can create custom QR codes that match
              your brand and style.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate  duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              I’m new to QR Codes. What should I know?
            </h2>
            <p className="text-md text-gray-600 mb-4">
              QR Code is a two-dimensional version of the barcode, typically
              made up of black and white pixel patterns. It was developed to
              accelerate logistics processes for automobile production. Now, it
              has found its way into mobile marketing.
            </p>
            <Link
              href="/more-info"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline"
            >
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
              href={currentUser ? "/dashboard" : "/login"}
              className="inline-flex items-center text-white px-8 py-3 rounded-full transition-translate duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 text-xl font-semibold bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:bg-gradient-to-bl"
            >
              {currentUser ? (
                <RiDashboardHorizontalFill className="mr-2" size={24} />
              ) : (
                <FaSignInAlt className="mr-2" size={24} />
              )}
              {currentUser ? "Get Started" : "Login"}
            </Link>
          </motion.div>

          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How do I create a free QR Code?
            </h2>
            <p className="text-md text-gray-600 mb-4">
              We’ll show you how in just three simple steps:
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {processStepCrads.map((processStepCrad, index) => {
            return (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-200 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {processStepCrad.heading}
                </h3>
                <p className="text-md text-gray-600 mb-4">
                  {processStepCrad.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-300 transform hover:-translate-y-2 hover:scale-[102%] col-span-1 md:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
        >
          <p className="text-gray-500 mb-2">
            Pro Tip: You can install this app on your mobile device by using
            Chrome's "Add to Home Screen" feature for quick access!
          </p>
          <p className="text-gray-500 mb-2">
            Explore the endless possibilities with QR codes, from simplifying
            your business operations to enhancing your marketing efforts.
          </p>
          <p className="text-gray-500">
            Don't have an account?
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline ml-1"
            >
              Sign up here
            </Link>
            .
          </p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-300 transform hover:-translate-y-2 hover:scale-[102%] col-span-1 md:col-span-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
        >
          <h3 className="text-xl font-bold text-gray-800">
            Follow Us on Social
          </h3>
          <h4 className="mb-4 text-stone-800">
            Follow us on social media to keep up with new features and exciting
            news!
          </h4>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com"
              className="text-blue-600 text-3xl hover:text-blue-800"
            >
              <Image src={MetaLogo} alt="Facebook" className="h-8 w-8" />
            </a>
            <a
              href="https://www.twitter.com"
              className="text-blue-400 text-3xl hover:text-blue-600"
            >
              <Image src={TwitterLogo} alt="Twitter" className="mt-1 h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-pink-600 text-3xl hover:text-pink-800"
            >
              <Image src={InstagramLogo} alt="Instagram" className="h-8 w-8" />
            </a>
            <a
              href="https://www.linkedin.com"
              className="text-blue-700 text-3xl hover:text-blue-900"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
