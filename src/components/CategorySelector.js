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
    <div className="flex justify-between mb-8 p-2 bg-gray-100 rounded-lg shadow-md">
      {categories.map(({ name, icon }) => (
        <motion.button
          key={name}
          onClick={() => handleCategoryChange(name)}
          className={`flex items-center p-4 rounded-lg font-medium focus:outline-none transition-transform duration-200 ${
            category === name ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={icon} className="text-xl" />
          <span className="ml-2 capitalize text-lg">{name}</span>
        </motion.button>
      ))}
    </div>
  );
}
