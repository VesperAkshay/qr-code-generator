import React from 'react';
import { motion } from 'framer-motion';

export default function QRCodeCanvas({ qrCodeRef, loading }) {
  return (
    <div className="flex justify-center mt-8">
      <motion.div
        ref={qrCodeRef}
        className="p-8 bg-white dark:bg-[#2b2661] rounded-2xl shadow-xl border border-gray-300 transition-transform duration-300 ease-in-out transform-gpu"
        whileHover={{ scale: 1.08, rotate: 1 }}
        whileTap={{ scale: 0.95, rotate: -1 }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {loading ? (
            <div className="text-gray-400 animate-pulse">Generating QR Code...</div>
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
