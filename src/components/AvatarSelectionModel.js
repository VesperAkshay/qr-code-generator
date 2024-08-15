// src/components/AvatarSelectionModal.js

import React from 'react';
import { motion } from 'framer-motion';

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

const AvatarSelectionModal = ({ isOpen, onClose, onSelectAvatar }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10"
      >
        <h2 className="text-xl font-bold mb-4">Select an Avatar</h2>
        <div className="flex flex-wrap gap-4">
          {avatars.map((avatar, index) => (
            <motion.img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              onClick={() => onSelectAvatar(avatar)}
              className="w-16 h-16 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default AvatarSelectionModal;
