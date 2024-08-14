import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaSquare, FaCircle, FaBorderStyle } from 'react-icons/fa';

export default function ColorPicker({ color, setColor, bgColor, setBgColor, eyeColor, setEyeColor, shape, setShape, frame, setFrame, eyeShape, setEyeShape }) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
      
      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold">
          <FaPalette className="mr-2" /> QR Code Color
        </label>
        <motion.input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 p-2 border rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold">
          <FaPalette className="mr-2" /> Background Color
        </label>
        <motion.input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full h-10 p-2 border rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold">
          <FaPalette className="mr-2" /> Eye Color
        </label>
        <motion.input
          type="color"
          value={eyeColor}
          onChange={(e) => setEyeColor(e.target.value)}
          className="w-full h-10 p-2 border rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold">
          <FaSquare className="mr-2" /> Shape
        </label>
        <motion.select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="w-full h-10 p-2 border rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="rounded">Rounded</option>
        </motion.select>
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold">
          <FaBorderStyle className="mr-2" /> Frame
        </label>
        <motion.select
          value={frame}
          onChange={(e) => setFrame(e.target.value)}
          className="w-full h-10 p-2 border rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="rounded">Rounded</option>
        </motion.select>
      </div>

      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold">
          <FaCircle className="mr-2" /> Eye Shape
        </label>
        <motion.select
          value={eyeShape}
          onChange={(e) => setEyeShape(e.target.value)}
          className="w-full h-10 p-2 border rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
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
