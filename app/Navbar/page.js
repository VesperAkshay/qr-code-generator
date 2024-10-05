"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useAuth } from "@/context/AuthContext"; 
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { useRouter } from "next/navigation";

import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaQrcode,
  FaPaintBrush,
  FaCog,
  FaMoon,
  FaSun,
  FaBars,
} from 'react-icons/fa';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redirect to the home page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav
      className={`p-4 shadow-lg ${
        darkMode
          ? "bg-[#00050e] border-b-[1px] border-[#333333]"
          : "bg-gradient-to-r from-indigo-600 to-purple-600"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FaQrcode className="text-white h-8 w-8" />
          <Link
            href="/"
            className="text-white font-bold text-xl flex items-center hover:text-indigo-200 transition duration-300"
          >
            <FaPaintBrush className="mr-2" />
            QR Code Customizer
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="relative flex items-center">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white hover:text-indigo-200 transition duration-300 focus:outline-none"
                >
                  <div className="flex items-center max-w-md">
                    <img
                      src={
                        currentUser.photoURL
                          ? currentUser.photoURL
                          : "/default-avatar.png"
                      }
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-white hover:text-indigo-300 ">
                      {currentUser.displayName
                        ? currentUser.displayName
                        : "User"}
                    </span>
                  </div>
                  <FaBars className="text-xl ml-2 md:hidden" />
                </button>
                <div className="relative" ref={dropdownRef}>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
                      >
                        <FaUser className="mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
                      >
                        <FaUser className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
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
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={()=>{setDarkMode(!darkMode);}}
                className="text-white hover:text-indigo-200 transition duration-300 text-xl"
              >
                {darkMode ? <MdLightMode/> : <FaMoon/>}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white flex items-center hover:text-indigo-200 transition duration-150"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-violet-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition duration-150 flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleDropdown} className="text-white">
            <FaBars />
          </button>
        </div>
      </div>
      {dropdownOpen && (
        <div className="md:hidden mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20">
          {currentUser ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaUser className="mr-2" />
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
              <Link
                href="/settings"
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
                onClick={()=>{setDarkMode(!darkMode);}}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300 w-full"
              >
                {darkMode ? <MdLightMode size={16}/> : <FaMoon size={10}/>} Toggle Dark Mode
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}