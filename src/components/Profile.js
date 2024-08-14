import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to update the user's display name
  const handleUpdateProfile = async () => {
    try {
      await updateProfile(currentUser, { displayName });
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  // Function to update the user's password
  const handleUpdatePassword = async () => {
    try {
      if (newPassword) {
        await updatePassword(currentUser, newPassword);
        setSuccess('Password updated successfully!');
        setError('');
      }
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('Failed to log out: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-8 max-w-lg mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-xl space-y-6 mt-12 text-white"
    >
      <h1 className="text-4xl font-extrabold mb-6 text-center">Profile</h1>
      {error && <p className="text-red-400 text-center font-semibold">{error}</p>}
      {success && <p className="text-green-400 text-center font-semibold">{success}</p>}
      
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Display Name</label>
          <div className="relative">
            <FaUserEdit className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-2 pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-gray-900"
              placeholder="Enter your display name"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            value={currentUser.email}
            disabled
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed text-gray-900"
            placeholder="Your email address"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">New Password</label>
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 text-gray-900"
              placeholder="Enter new password"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4 justify-between mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdateProfile}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center"
        >
          <FaUserEdit className="mr-2" />
          Update Profile
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdatePassword}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center"
        >
          <FaLock className="mr-2" />
          Update Password
        </motion.button>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8"
      >
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-md w-full flex items-center justify-center"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
}
