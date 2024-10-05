import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaLock, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AvatarSelectionModal from './AvatarSelectionModel'; // Make sure the path is correct

const avatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
  '/avatars/avatar5.png',
  '/avatars/avatar6.png',
  '/avatars/avatar7.png',
  '/avatars/avatar8.png',
  '/avatars/avatar9.png',
  '/avatars/avatar10.png',
];

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.photoURL || avatars[0]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(currentUser, { displayName, photoURL: selectedAvatar });
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('Failed to log out: ' + error.message);
      setSuccess('');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-6 md:p-8 max-w-md lg:max-w-lg mx-auto bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl space-y-8 mt-12 text-white"
    >
      <motion.h1 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-3xl md:text-4xl font-extrabold text-center">
        Profile
      </motion.h1>
      {error && <p className="text-red-400 text-center font-semibold">{error}</p>}
      {success && <p className="text-green-400 text-center font-semibold">{success}</p>}
      
      <div className="text-center">
        <img src={selectedAvatar} alt="Selected Avatar" className="w-24 h-24 mx-auto rounded-full shadow-lg" />
        <button
          onClick={openModal}
          className="mt-4 flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <FaEdit className="mr-2" />
          Change Avatar
        </button>
      </div>

      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label className="block text-lg font-medium">Display Name</label>
          <div className="relative mt-2">
            <FaUserEdit className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="pl-12 pr-4 py-3 border border-gray-400 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50 text-gray-900 transition duration-300"
              placeholder="Enter your display name"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            value={currentUser.email}
            disabled
            className="mt-2 pl-4 py-3 border border-gray-400 rounded-lg w-full bg-gray-200 cursor-not-allowed text-gray-900"
            placeholder="Your email address"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <label className="block text-lg font-medium">New Password</label>
          <div className="relative mt-2">
            <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-12 pr-4 py-3 border border-gray-400 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50 text-gray-900 transition duration-300"
              placeholder="Enter new password"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdateProfile}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg flex items-center justify-center w-full"
        >
          <FaUserEdit className="mr-2" />
          Update Profile
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdatePassword}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg flex items-center justify-center w-full"
        >
          <FaLock className="mr-2" />
          Update Password
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg flex items-center justify-center w-full mt-4"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </motion.button>

      <AvatarSelectionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelectAvatar={handleSelectAvatar}
      />
    </motion.div>
  );
}
