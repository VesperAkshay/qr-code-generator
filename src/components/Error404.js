import React from "react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        className="text-center"
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 60, duration: 1.5 }}
      >
        <motion.div
          className="relative m-auto"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.circle
              cx="10.5"
              cy="10.5"
              r="7.5"
              stroke="white"
              strokeWidth="2"
            />
            <motion.line
              x1="15.75"
              y1="15.75"
              x2="21"
              y2="21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        <motion.h1
          className="text-9xl font-extrabold text-red-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-2xl text-gray-300 mt-4"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Oops! Looks like you're lost. Let's get you back on track!
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 mt-2"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Click below to head back home and find your way.
        </motion.p>

        <motion.a
          href="/"
          className="inline-block mt-8 px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
