'use client'

import React, { useState } from 'react';
import Profile from '@/app/profile/profile';
import { motion } from 'framer-motion';

export default function ProfilePage() {


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl font-extrabold text-white mb-8 text-center"
      >
        Your Profile
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-lg"
      >
        <Profile />
      </motion.div>
    </motion.div>
  );
}
