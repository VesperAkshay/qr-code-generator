'use client'
import { FaExpandArrowsAlt } from 'react-icons/fa';

export default function SizeSlider({ size, setSize }) {
  return (
    <div className="mb-6">
      <label className=" mb-2 text-gray-700 flex items-center">
        <FaExpandArrowsAlt className="mr-2 text-gray-500" />
        Size
      </label>
      <div className="relative">
        <input
          type="range"
          min="100"
          max="600"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <div
          className="absolute top-0 left-0 h-full bg-indigo-500 rounded-lg"
          style={{ width: `${((size - 100) / 500) * 100}%` }}
        />
      </div>
      <span className="block text-center text-gray-600 mt-2 text-lg font-semibold">
        {size}px
      </span>
    </div>
  );
}
