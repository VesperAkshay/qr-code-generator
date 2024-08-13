import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to update the user's password
  const handleUpdatePassword = async () => {
    try {
      if (newPassword) {
        await updatePassword(currentUser, newPassword);
        setSuccess('Password updated successfully!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to the home page after logout
    } catch (error) {
      setError('Failed to log out: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      
      <div className="mb-4">
        <label className="block text-gray-700">Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={currentUser.email}
          disabled
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update Profile
        </button>
        <button
          onClick={handleUpdatePassword}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Update Password
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
