import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaQrcode, FaPaintBrush } from 'react-icons/fa';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to the home page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FaQrcode className="text-white h-8 w-8" />
          <Link to="/" className="text-white font-bold text-xl flex items-center hover:text-indigo-200 transition duration-300">
            <FaPaintBrush className="mr-2" />
            QR Code Customizer
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to="/profile" className="text-white flex items-center hover:text-indigo-200 transition duration-300">
                <FaUser className="mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white flex items-center hover:text-indigo-200 transition duration-300">
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 flex items-center">
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
