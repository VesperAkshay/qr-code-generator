import React from 'react';
import { FaExpandArrowsAlt } from 'react-icons/fa';

export default function SizeSlider({ size, setSize }) {
  return (
    <div className="mb-6">
      <label className="mb-2 text-gray-700 dark:text-gray-200 flex items-center">
        <FaExpandArrowsAlt className="mr-2 text-gray-500 dark:text-gray-200 " />
        Size
      </label>
      <div className="relative">
        <input
          type="range"
          min="100"
          max="600"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #4f46e5 ${((size - 100) / 500) * 100}%, #d1d5db ${((size - 100) / 500) * 100}%)`,
          }}
        />
      </div>
      <span className="block text-center text-gray-600 dark:text-gray-300 mt-2 text-lg font-semibold">
        {size}px
      </span>
    </div>
  );
}
