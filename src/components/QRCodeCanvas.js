import React from 'react';
import { motion } from 'framer-motion';

export default function QRCodeCanvas({ qrCodeRef, loading }) {
  return (
    <div className="flex justify-center mt-8">
      <motion.div
        ref={qrCodeRef}
        className="p-6 bg-white rounded-lg shadow-lg border-2 border-gray-200 transition-transform duration-300 ease-in-out"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
