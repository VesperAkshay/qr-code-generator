
import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

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
import toast from "react-hot-toast";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    // Show a confirmation toast
    const confirmation = toast(
      (t) => (
        <div>
          <p>Are you sure you want to log out?</p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the confirmation toast
              }}
              className="text-blue-600 hover:bg-blue-200 px-4 py-2 bg-blue-100  m-2 mt-4 rounded-md "
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the confirmation toast
                try {
                  await logout(); // Proceed with logout
                  navigate("/"); // Redirect to the home page after logout
                  toast.success("Logged out");
                } catch (error) {
                  console.error("Failed to log out", error);
                  toast.error("Logout failed. Please try again."); // Show an error message
                }
              }}
              className="text-red-600 hover:bg-red-200 px-4 py-2 bg-red-100 m-2 mt-4 rounded-md"
            >
              Log out
            </button>
          </div>
        </div>
      ),
      {
        duration: 0, // Keep the toast open until dismissed
        position: "top-center", // Adjust position if needed
      }
    );
  };

  const handleToggleTheme = () => {
    toggleTheme();
    toast(`Theme changed to ${theme === "light" ? "Dark" : "Light"} mode!`, {
      icon: `${theme === "light" ? "🌙" : "☀️"}`,
      style: {
        borderRadius: "10px",
        background: `${theme === "light" ? "#333" : "#fff"} `,
        color: `${theme === "light" ? "#fff" : "#333"}`,
      },
    });
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
    <nav className={`p-4 ${location.pathname === "/register" ? "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800" : ""}"`} >

      <div className="container mx-auto flex justify-between items-center">
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
                            onClick={handleToggleTheme}
                            className="md:hidden flex rounded-xl items-center px-4 py-2 text-white hover:bg-cyan-500 text-lg hover:text-white transition duration-300 w-full"
                          >
                            {theme === "dark" ? <MdLightMode /> : <FaMoon />}
                            {theme === "dark" ? "Light Mode" : "Dark Mode"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {/* <button

                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                className="text-white hover:text-indigo-200 transition duration-300 text-xl"
              >
                {darkMode ? <MdLightMode /> : <FaMoon />}
              </button> */}
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
            onClick={handleToggleTheme}
            className="max-md:hidden text-white hover:text-indigo-200 transition duration-300 text-xl"
          >
            {theme === "dark" ? <MdLightMode /> : <FaMoon />}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {/* {dropdownOpen && (
        <div className="md:hidden mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20">
          {currentUser ? (
            <>
              {currentUser.emailVerified && ( // Check if the user is verified
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
                >
                  <FaUser className="mr-2" />
                  Dashboard
                </Link>
              )}
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaCog className="mr-2" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-red-500 hover:text-white transition duration-300 w-full"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300 w-full"
              >
                {darkMode ? <MdLightMode size={16} /> : <FaMoon size={10} />}{" "}
                Toggle Dark Mode
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      )} */}
    </nav>
  );
}