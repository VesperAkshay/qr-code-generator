import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default function FileUploader({ handleLogoChange }) {
  return (
    <div className="mb-8 p-4 bg-gray-100 dark:bg-[#2b2661] rounded-lg shadow-md">
      <label className=" mb-2 text-gray-700 dark:text-gray-300 font-semibold flex items-center">
        <FontAwesomeIcon icon={faUpload} className="text-xl mr-2" />
        <span>Upload Logo (optional)</span>
      </label>
      <motion.input
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:text-white dark:bg-[#2b2661] hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      />
    </div>
  );
}
