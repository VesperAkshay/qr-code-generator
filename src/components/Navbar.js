import React, { useState, useEffect, useRef, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaQrcode,
  FaPaintBrush,
  FaCog,
  FaMoon,
  FaBars, // Icon for dropdown
} from "react-icons/fa";
import { MdLightMode } from "react-icons/md";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to the home page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); // Button ke liye separate ref

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Only close the dropdown when clicking outside
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);
  

  return (
    <nav
      className="p-4"
    >
      
      <div className="container mx-auto flex justify-between items-center px-3">
        <div className="flex items-center space-x-3">
          <FaQrcode className="text-white h-8 w-8" />
          <Link
            to="/"
            className="text-white font-bold text-xl flex items-center hover:text-indigo-200 transition duration-300"
          >
            <FaPaintBrush className="mr-2" />
            QR Code Customizer
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="relative flex items-center">
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  className="flex items-center text-white hover:text-indigo-200 transition duration-300 focus:outline-none"
                >
                  <div className="hidden md:flex items-center">
                    <img
                      src={
                        currentUser.photoURL
                          ? currentUser.photoURL
                          : "/default-avatar.png"
                      }
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-white hover:text-indigo-300 font-semibold">
                      {currentUser.displayName
                        ? currentUser.displayName
                        : "User"}
                    </span>
                  </div>
                  <FaBars className="text-2xl ml-2 md:hidden" />
                </button>
                <div className="relative" ref={dropdownRef}>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, x: 40, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="absolute right-0 top-5 w-72 bg-violet-700 rounded-xl shadow-lg p-4 z-20">
                          <Link
                            to="/dashboard"
                            className="flex rounded-xl items-center px-4 py-2 text-white hover:bg-cyan-500 text-lg hover:text-white transition duration-300"
                          >
                            <FaUser className="mr-2" />
                            Dashboard
                          </Link>
                          <Link
                            to="/profile"
                            className="flex rounded-xl items-center px-4 py-2 text-white hover:bg-cyan-500 text-lg hover:text-white transition duration-300"
                          >
                            <FaUser className="mr-2" />
                            Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex rounded-xl items-center px-4 py-2 text-white hover:bg-cyan-500 text-lg hover:text-white transition duration-300"
                          >
                            <FaCog className="mr-2" />
                            Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex rounded-xl items-center px-4 py-2 text-white hover:bg-red-500 text-lg hover:text-white transition duration-300 w-full"
                          >
                            <FaSignOutAlt className="mr-2" />
                            Logout
                          </button>
                          <button
                            onClick={toggleTheme}
                            className="md:hidden flex rounded-xl items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-cyan-500 text-lg hover:text-white transition duration-300 w-full"
                          >
                            {theme === 'dark'  ? <MdLightMode /> : <FaMoon />}
                            {theme === 'dark'  ? "Light Mode" : "Dark Mode"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white flex items-center hover:text-indigo-200 transition duration-150"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-violet-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition duration-150 flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="max-md:hidden text-white hover:text-indigo-200 transition duration-300 text-xl"
          >
            {theme==='dark' ? <MdLightMode /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
