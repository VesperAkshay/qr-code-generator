import React, { useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [email, setEmail] = useState(currentUser.email || '');
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

  // Function to update the user's email
  const handleUpdateEmail = async () => {
    try {
      if (email) {
        await updateEmail(currentUser, email);
        setSuccess('Email updated successfully!');
        setError('');
      }
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
      navigate('/'); // Redirect to the home page after logout
    } catch (error) {
      setError('Failed to log out: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-purple-500 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full space-y-6 transition-transform transform hover:scale-105">
        <div className="flex items-center justify-center">
          <FaUserCog className="text-blue-600 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Settings</h1>
        
        {success && <p className="text-green-500 text-center font-semibold">{success}</p>}
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">Display Name</label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter your display name"
              />
              <FaUserCog className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter your email"
              />
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">New Password</label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter new password"
              />
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={handleUpdateProfile}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center"
            >
              <FaUserCog className="mr-2" />
              Update Profile
            </button>
            <button
              type="button"
              onClick={handleUpdateEmail}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center"
            >
              <AiOutlineMail className="mr-2" />
              Update Email
            </button>
            <button
              type="button"
              onClick={handleUpdatePassword}
              className="bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition duration-300 shadow-md flex items-center justify-center"
            >
              <AiOutlineLock className="mr-2" />
              Update Password
            </button>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-md w-full flex items-center justify-center"
            >
              <FaUserCog className="mr-2" />
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
