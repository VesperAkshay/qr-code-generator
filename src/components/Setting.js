import React, { useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
// import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Settings() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [prevPassword, setPrevPassword] = useState(''); // State for previous password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming new password
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

   
  // Function to update the user's display name
  const handleUpdateProfile = async () => {
    try {
      await updateProfile(currentUser, { displayName });
      toast.success('Profile updated successfully!');
      setError('');
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error.message);
      setSuccess('');
    }
  };

  // Function to update the user's email
  const handleUpdateEmail = async () => {
    try {
      if (email) {
        await updateEmail(currentUser, email);
        toast.success('Email updated successfully!');
        setError('');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error.message);
      setSuccess('');
    }
  };

  // // Function to update the user's password
  // const handleUpdatePassword = async () => {
  //   try {
  //     if (newPassword) {
  //       await updatePassword(currentUser, newPassword);
  //       toast.success('Password updated successfully!');
  //       setError('');
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong');
  //     console.error(error.message);
  //     setSuccess('');
  //   }
  // };

 // Function to reauthenticate user with the old password
 const reauthenticateUser = async () => {
  const credential = EmailAuthProvider.credential(currentUser.email, prevPassword);
  try {
    await reauthenticateWithCredential(currentUser, credential);
    return true;
  } catch (error) {
    toast.error('Invalid current password');
    return false;
  }
};

// Function to update the user's password
const handleUpdatePassword = async () => {
  if (!newPassword || !prevPassword || !confirmPassword) {
    setError('All fields are required.');
    return;
  }

  if (newPassword !== confirmPassword) {
    setError('New password and confirm password do not match.');
    return;
  }

  const isReauthenticated = await reauthenticateUser();
  if (isReauthenticated) {
    try {
      await updatePassword(currentUser, newPassword);
      toast.success('Password updated successfully!');
      setError('');
      setNewPassword('');
      setPrevPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to update password');
      console.error(error.message);
      setSuccess('');
    }
  }
};


 // Function to handle logout
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
              className="text-blue-600 hover:bg-blue-200 px-4 py-2 bg-blue-100 m-2 mt-4 rounded-md "
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
              className="text-red-600 hover:bg-red-200 px-4 py-2 bg-red-100 m-2 mt-4 rounded-md "
            >
              Log out
            </button>
          </div>
        </div>
      ),
      {
        duration: 0, // Keep the toast open until dismissed
        position: 'top-center', // Adjust position if needed
      }
    )
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-purple-100 dark:bg-[#2b2661] rounded-xl shadow-lg p-8 max-w-lg w-full space-y-6 transition-transform transform hover:scale-105">
        <div className="flex items-center justify-center">
          <FaUserCog className="text-blue-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-200">Settings</h1>
        
        {success && <p className="text-green-500 text-center font-semibold">{success}</p>}
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Display Name</label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2 p-3 border border-gray-400 dark:bg-indigo-950 dark:text-gray-200 font-semibold rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter your display name"
              />
              <FaUserCog className="absolute text-xl left-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 border border-gray-400 dark:bg-indigo-950 dark:text-gray-200 font-semibold rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter your email"
              />
              <AiOutlineMail className="absolute text-xl left-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 p-3 border border-gray-400 dark:bg-indigo-950 dark:text-gray-200 font-semibold rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter new password"
              />
              <AiOutlineLock className="absolute text-xl left-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div> */}
           <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <div className="relative">
              <input
                type="password"
                value={prevPassword}
                onChange={(e) => setPrevPassword(e.target.value)}
                className="mt-2 p-3 border border-gray-400 dark:bg-indigo-950 dark:text-gray-200 font-semibold rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter current password"
              />
              <AiOutlineLock className="absolute text-xl left-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 p-3 border border-gray-400 dark:bg-indigo-950 dark:text-gray-200 font-semibold rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Enter new password"
              />
              <AiOutlineLock className="absolute text-xl left-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 p-3 border border-gray-400 dark:bg-indigo-950 dark:text-gray-200 font-semibold rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
                placeholder="Confirm new password"
              />
              <AiOutlineLock className="absolute text-xl left-2 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          

          <div className="flex flex-col space-y-4 mt-6 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={handleUpdateProfile}
              className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center"
            >
              <FaUserCog className="mr-2 text-3xl" />
              Update Profile
            </button>
            <button
              type="button"
              onClick={handleUpdateEmail}
              className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center"
            >
              <AiOutlineMail className="mr-2 text-3xl" />
              Update Email
            </button>
            <button
              type="button"
              onClick={handleUpdatePassword}
              className="bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition duration-300 shadow-md flex items-center justify-center"
            >
              <AiOutlineLock className="mr-2 text-3xl" />
              Update Password
            </button>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-md w-full flex items-center justify-center"
            >
              <FaUserCog className="mr-2 text-xl" />
              Logout
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
