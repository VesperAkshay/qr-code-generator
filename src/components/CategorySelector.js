import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faLink, faAddressCard, faWifi } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function CategorySelector({ category, handleCategoryChange }) {
  const categories = [
    { name: 'text', icon: faFileAlt },
    { name: 'URL', icon: faLink },
    { name: 'vCard', icon: faAddressCard },
    { name: 'wifi', icon: faWifi },
  ];

  return (
    <div className="flex justify-around mb-8 p-4 bg-gray-100 dark:bg-[#2b2661] rounded-xl shadow-lg space-x-6">
      {categories.map(({ name, icon }) => (
        <motion.button
          key={name}
          onClick={() => handleCategoryChange(name)}
          className={`flex flex-col items-center p-4 rounded-lg font-medium focus:outline-none transition-transform ${
            category === name
              ? 'bg-blue-500 text-white shadow-2xl transform scale-105'
              : 'bg-white dark:bg-indigo-950 text-gray-700 dark:text-gray-200 shadow-md'
          }`}
          whileHover={{
            scale: 1.12,
            rotate: 1,
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
            transition: { duration: 0.15 },
          }}
          whileTap={{
            scale: 0.92,
            rotate: -1,
            transition: { duration: 0.1 },
          }}
        >
          <motion.div
            className={`text-2xl mb-2 p-2 rounded-full bg-white text-gray-700`}
          >
            <FontAwesomeIcon icon={icon} />
          </motion.div>
          <span className="capitalize text-sm">{name}</span>
        </motion.button>
      ))}
    </div>
  );
}
