import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaQrcode, FaSignInAlt } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { motion } from "framer-motion";
import TwitterLogo from "../assets/twitter.png";
import MetaLogo from "../assets/meta.png";
import InstagramLogo from "../assets/instagram.png";
import { useAuth } from "../context/AuthContext";
import LinkedinLogo from "../assets/linkedin-logo.png";
import { ThemeContext } from "../context/ThemeContext";

// Different fuctions to open links in new tab
function openLinkFB() {
  window.open("https://www.facebook.com");
}
function openLinkX() {
  window.open("https://www.twitter.com");
}
function openLinkIG() {
  window.open("https://www.instagram.com");
}
function openLinkLI() {
  window.open("https://www.linkedin.com");
}

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
  //crousel
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

  // const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { currentUser } = useAuth();
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

  return (
    <div className="flex justify-center items-center min-h-screen p-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
      <motion.div
        className="text-center p-8 bg-white dark:bg-indigo-950 bg-opacity-90 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* QR Code Icon */}
        <motion.div
          className="mx-auto text-gray-800 dark:text-gray-200 text-6xl mb-4"
          initial={{ rotate: -45 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <FaQrcode />
        </motion.div>

        {/* Welcome Message */}
        <motion.h1
          className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-200"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Welcome to the QR Code Generator
        </motion.h1>

        {/* Introductory Text */}
        <motion.p
          className="text-lg mb-8 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Create and customize your own QR codes easily.
        </motion.p>

        {/* Carousel Section */}
        <div className="relative mb-12 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 rounded-xl overflow-hidden shadow-lg">
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
              <h2 className="text-3xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">
                {carouselItems[currentSlide].title}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {carouselItems[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-60 p-3 rounded-full hover:bg-opacity-75 dark:hover:bg-opacity-75 transition-all duration-300"
          >
            <FaArrowLeft className="text-indigo-800 dark:text-indigo-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-60 p-3 rounded-full hover:bg-opacity-75 dark:hover:bg-opacity-75 transition-all duration-300"
          >
            <FaArrowRight className="text-indigo-800 dark:text-indigo-300" />
          </button>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Why use QR Codes? */}
          <motion.div
            className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 dark:hover:bg-indigo-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
              💡 <span className="font-semibold">Why use QR Codes?</span>
            </p>
            <p className="text-md text-gray-600 dark:text-gray-300">
              QR codes are a versatile tool for businesses and personal use.
              They can link to websites, contact information, and even payment
              options. With our tool, you can create custom QR codes that match
              your brand and style.
            </p>
          </motion.div>

          {/* Card 2: Intro to QR Codes */}
          <motion.div
            className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-300 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 dark:hover:bg-indigo-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
              I’m new to QR Codes. What should I know?
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
              QR Code is a two-dimensional version of the barcode, typically
              made up of black and white pixel patterns. It was developed to
              accelerate logistics processes for automobile production. Now, it
              has found its way into mobile marketing.
            </p>
            <Link
              to="/more-info"
              className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 text-lg transition-colors duration-300 hover:underline"
            >
              Tell me more
            </Link>
          </motion.div>

          {/* Centered Login Button */}
          <motion.div
            className="col-span-1 md:col-span-2 flex justify-center my-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          >
            <Link
              to={currentUser ? "/dashboard" : "/login"}
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

          {/* Card for Creating QR Code Section */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How do I create a free QR Code?
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
              We’ll show you how in just three simple steps:
            </p>
          </motion.div>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {processStepCrads.map((processStepCrad, index) => {
            return (
              <motion.div
                key={index}
                className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-200 transform hover:-translate-y-2 hover:scale-105 hover:bg-purple-50 dark:hover:bg-indigo-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {processStepCrad.heading}
                </h3>
                <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
                  {processStepCrad.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Centered Pro Tip Card */}
        <motion.div
          className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-300 transform hover:-translate-y-2 hover:scale-[102%] col-span-1 md:col-span-2 text-gray-500 dark:text-gray-200 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
        >
          <p className="">
            Pro Tip: You can install this app on your mobile device by using
            Chrome's "Add to Home Screen" feature for quick access!
          </p>
          <p className="">
            Explore the endless possibilities with QR codes, from simplifying
            your business operations to enhancing your marketing efforts.
          </p>
          <p className="">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors duration-300 hover:underline ml-1"
            >
              Sign up here
            </Link>
            .
          </p>
        </motion.div>
        {/* Follow Us on Social Section */}
        <motion.div
          className="bg-white dark:bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-translate duration-300 transform hover:-translate-y-2 hover:scale-[102%] col-span-1 md:col-span-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 ">
            Follow Us on Social
          </h3>
          <h4 className="mb-4 dark:text-gray-100">
            Follow us on social media to keep up with new features and exciting
            news!
          </h4>
          <div className="flex justify-center space-x-6">
            {/* added onclick attribute and set to call openLink functions, respectively for that website */}
            <a
              href="https://www.facebook.com"
              className="text-blue-600 text-3xl hover:text-blue-800"
            >
              <img src={MetaLogo} alt="Facebook" className="h-8 w-8" onclick="openLinkFB();" />
            </a>
            <a
              href="https://www.twitter.com"
              className="text-blue-400 text-3xl hover:text-blue-600"
            >
              <img src={TwitterLogo} alt="Twitter" className="h-8 w-8" onclick="openLinkX();" />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-pink-600 text-3xl hover:text-pink-800"
            >
              <img src={InstagramLogo} alt="Instagram" className="h-8 w-8" onclick="openLinkIG();" />
            </a>
            <a
              href="https://www.linkedin.com"
              className="text-blue-700 text-3xl hover:text-blue-900"
            >
              <img src={LinkedinLogo} alt="Instagram" className="h-8 w-8" onclick="openLinkLI();" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}