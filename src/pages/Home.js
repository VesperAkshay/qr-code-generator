import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaQrcode,
  FaSignInAlt,
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TwitterLogo from "../assets/twitter.png";
import MetaLogo from "../assets/meta.png";
import InstagramLogo from "../assets/instagram.png";

const carouselItems = [
  {
    title: "Create Custom QR Codes",
    description: "Design unique QR codes that match your brand and style.",
    icon: "🎨",
  },
  {
    title: "Easy to Use",
    description: "Generate QR codes in just a few simple steps.",
    icon: "🚀",
  },
  {
    title: "Multiple QR Types",
    description: "Create QR codes for URLs, vCards, plain text, and WiFi.",
    icon: "📱",
  },
  {
    title: "Free to Use",
    description: "Start creating QR codes without any cost.",
    icon: "💸",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-8">
      <motion.div
        className="max-w-6xl mx-auto bg-white bg-opacity-95 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center">
              <FaQrcode className="text-4xl mr-4" />
              <h1 className="text-4xl font-extrabold">QR Code Generator</h1>
            </div>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-colors duration-300"
            >
              <FaSignInAlt className="inline mr-2" />
              Login
            </Link>
          </motion.div>
        </header>

        <main className="p-8">
          {/* Carousel Section */}
          <div className="relative mb-12 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <div className="text-6xl mb-4">
                  {carouselItems[currentSlide].icon}
                </div>
                <h2 className="text-3xl font-bold mb-4 text-indigo-800">
                  {carouselItems[currentSlide].title}
                </h2>
                <p className="text-xl text-gray-700">
                  {carouselItems[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
            >
              <FaArrowLeft className="text-indigo-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all duration-300"
            >
              <FaArrowRight className="text-indigo-800" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                Why use QR Codes?
              </h3>
              <p className="text-gray-700">
                QR codes are versatile tools for businesses and personal use.
                They can link to websites, contact information, and even payment
                options. With our tool, you can create custom QR codes that
                match your brand and style.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                New to QR Codes?
              </h3>
              <p className="text-gray-700 mb-4">
                QR Code is a two-dimensional barcode that can store various
                types of information. Originally developed for the automotive
                industry, it's now widely used in marketing and information
                sharing.
              </p>
              <Link
                to="/more-info"
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300 hover:underline"
              >
                Learn More →
              </Link>
            </motion.div>
          </div>

          {/* How to Create Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6">
              How to Create Your Free QR Code
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Select Type",
                  description: "Choose from URL, vCard, Plain Text, or WiFi.",
                },
                {
                  title: "Fill Details",
                  description:
                    "Enter the required information for your chosen QR code type.",
                },
                {
                  title: "Generate & Download",
                  description:
                    "Create your QR code and download it in your preferred format.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pro Tip */}
          <motion.div
            className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl shadow-lg mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-orange-800 mb-4">
              Pro Tip
            </h3>
            <p className="text-gray-700 mb-4">
              Install this app on your mobile device using Chrome's "Add to Home
              Screen" feature for quick access!
            </p>
            <p className="text-gray-700">
              Don't have an account?
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300 hover:underline ml-1"
              >
                Sign up here
              </Link>
              .
            </p>
          </motion.div>

          {/* Social Media Section */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
              Follow Us
            </h3>
            <p className="text-gray-600 mb-6">
              Stay updated with new features and exciting news!
            </p>
            <div className="flex justify-center space-x-6">
              {[
                {
                  href: "https://www.facebook.com",
                  logo: MetaLogo,
                  alt: "Facebook",
                },
                {
                  href: "https://www.twitter.com",
                  logo: TwitterLogo,
                  alt: "Twitter",
                },
                {
                  href: "https://www.instagram.com",
                  logo: InstagramLogo,
                  alt: "Instagram",
                },
                {
                  href: "https://www.linkedin.com",
                  icon: FaLinkedin,
                  alt: "LinkedIn",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-gray-500"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.logo ? (
                    <img
                      src={social.logo}
                      alt={social.alt}
                      className="h-8 w-8"
                    />
                  ) : (
                    <social.icon className="h-8 w-8" />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}
