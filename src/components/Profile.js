import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaLock, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md"; // Make sure the path is correct
import { auth } from "../firebase";
import { motion } from "framer-motion";
import AvatarSelectionModal from "./AvatarSelectionModel";
import toast from "react-hot-toast";

const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
  "/avatars/avatar10.png",
];

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState();
  const [displayName, setDisplayName] = useState(
    currentUser.displayName ? currentUser.displayName : ""
  );
  const [newPassword, setNewPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.photoURL);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProvider(auth.currentUser.providerData[0].providerId);
  }, []);
  const handleUpdateProfile = async () => {
    try {
      await updateProfile(currentUser, {
        displayName,
        photoURL: selectedAvatar,
      });
      toast.success("Profile updated successfully!");
      // setSuccess("Profile updated successfully!");
      setError("");
    } catch (error) {
      toast.error("Cannot update Profile");
      // setError(error.message);
      console.error(error.message);
      setSuccess("");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (newPassword) {
        await updatePassword(currentUser, newPassword);
        // setSuccess("Password updated successfully!");
        toast.success("Password updated successfully!");
        setError("");
      }
    } catch (error) {
      toast.error("Cannot update Password");
      // setError(error.message);
      console.error(error.message);
      setSuccess("");
    }
  };

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
        position: "top-center", // Adjust position if needed
      }
    );
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 md:p-8 max-w-md lg:max-w-lg mx-auto bg-purple-100 dark:bg-[#2b2661] rounded-2xl shadow-2xl space-y-8 mt-4 text-white"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-gray-700 dark:text-gray-200 text-center"
      >
        Profile
      </motion.h1>
      {error && (
        <p className="text-red-400 text-center font-semibold">{error}</p>
      )}
      {success && (
        <p className="text-green-400 text-center font-semibold">{success}</p>
      )}
      <div className="text-center">
        <img
          src={selectedAvatar}
          alt="Selected Avatar"
          className="w-24 h-24 mx-auto rounded-full shadow-lg"
        />
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
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Display Name
          </label>
          <div className="relative mt-2">
            <FaUserEdit className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="font-semibold pl-12 pr-4 py-3 border border-gray-400 dark:text-gray-200 dark:bg-indigo-950 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 text-gray-900 transition duration-300"
              placeholder="Enter your display name"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative mt-2">
            <MdMarkEmailRead className="text-xl absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300" />
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="font-semibold pl-12 py-3 border border-gray-400 rounded-lg w-full bg-gray-200 dark:text-gray-400 dark:bg-indigo-950 cursor-not-allowed text-gray-900"
              placeholder="Your email address"
            />
          </div>
        </motion.div>
        {provider != "google.com" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <div className="relative mt-2">
              <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="font-semibold pl-12 pr-4 py-3 border border-gray-400 dark:text-gray-200 dark:bg-indigo-950 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 text-gray-900 transition duration-300"
                placeholder="Enter new password"
              />
            </div>
          </motion.div>
        )}
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
        {provider != "google.com" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdatePassword}
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg flex items-center justify-center w-full"
          >
            <FaLock className="mr-2" />
            Update Password
          </motion.button>
        )}
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
