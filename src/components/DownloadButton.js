import React from 'react';
import { motion } from 'framer-motion';

export default function DownloadButton({ handleDownload, downloadFormat, setDownloadFormat }) {
  return (
    <motion.div
      className="flex justify-between items-center mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.select
        value={downloadFormat}
        onChange={(e) => setDownloadFormat(e.target.value)}
        className="p-2 dark:bg-[#2b2661] dark:text-gray-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
        <option value="svg">SVG</option>
      </motion.select>

      <motion.button
        onClick={handleDownload}
        className="bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download QR Code
      </motion.button>
    </motion.div>
  );
}
