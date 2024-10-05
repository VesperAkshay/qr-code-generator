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
    <div className="flex justify-around mb-8 p-4 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-xl shadow-lg space-x-6">
      {categories.map(({ name, icon }) => (
        <motion.button
          key={name}
          onClick={() => handleCategoryChange(name)}
          className={`flex flex-col items-center p-4 rounded-lg font-medium focus:outline-none transition-transform ${
            category === name
              ? 'bg-blue-500 text-white shadow-2xl transform scale-105'
              : 'bg-white text-gray-700 shadow-md'
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
            className={`text-2xl mb-2 p-2 rounded-full ${
              category === name ? 'bg-white text-blue-500' : 'bg-gray-200 text-gray-700'
            }`}
            whileHover={{
              scale: 1.25,
              backgroundColor: category === name ? '#FFFFFF' : '#E5E7EB',
              transition: { duration: 0.1 },
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </motion.div>
          <span className="capitalize text-sm">{name}</span>
        </motion.button>
      ))}
    </div>
  );
}
