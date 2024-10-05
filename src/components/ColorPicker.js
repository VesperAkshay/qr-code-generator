import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaSquare, FaCircle, FaBorderStyle } from 'react-icons/fa';

export default function ColorPicker({ color, setColor, bgColor, setBgColor, eyeColor, setEyeColor, shape, setShape, frame, setFrame, eyeShape, setEyeShape }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-4 bg-gray-100 dark:bg-[#2b2661] rounded-xl shadow-lg">

      <div>
        <label className="flex items-center mb-2 text-gray-800 dark:text-gray-200 font-bold">
          <FaPalette className="mr-2 text-blue-500" /> QR Code Color
        </label>
        <motion.input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 p-2 border border-gray-500 dark:bg-indigo-950 rounded-lg cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-800 dark:text-gray-200 font-bold">
          <FaPalette className="mr-2 text-blue-500" /> Background Color
        </label>
        <motion.input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full h-12 p-2 border border-gray-500 dark:bg-indigo-950 rounded-lg cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-800 dark:text-gray-200 font-bold">
          <FaPalette className="mr-2 text-blue-500" /> Eye Color
        </label>
        <motion.input
          type="color"
          value={eyeColor}
          onChange={(e) => setEyeColor(e.target.value)}
          className="w-full h-12 p-2 border border-gray-500 dark:bg-indigo-950 rounded-lg cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-800 dark:text-gray-200 font-bold">
          <FaSquare className="mr-2 text-blue-500" /> Shape
        </label>
        <motion.select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="w-full h-12 p-2 border border-gray-500 dark:text-gray-200 dark:bg-indigo-950 rounded-lg cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="rounded">Rounded</option>
        </motion.select>
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-800 dark:text-gray-200 font-bold">
          <FaBorderStyle className="mr-2 text-blue-500" /> Frame
        </label>
        <motion.select
          value={frame}
          onChange={(e) => setFrame(e.target.value)}
          className="w-full h-12 p-2 border border-gray-500 dark:text-gray-200 dark:bg-indigo-950 rounded-lg cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="rounded">Rounded</option>
        </motion.select>
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-800 dark:text-gray-200 font-bold">
          <FaCircle className="mr-2 text-blue-500" /> Eye Shape
        </label>
        <motion.select
          value={eyeShape}
          onChange={(e) => setEyeShape(e.target.value)}
          className="w-full h-12 p-2 border border-gray-500 dark:text-gray-200 dark:bg-indigo-950 rounded-lg cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="rounded">Rounded</option>
        </motion.select>
      </div>

    </div>
  );
}
