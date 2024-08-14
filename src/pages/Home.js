import React from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaSignInAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <FaQrcode className="mx-auto text-gray-800 text-6xl mb-4" />
        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">Welcome to the QR Code Generator</h1>
        <p className="text-lg mb-8 text-gray-600">Create and customize your own QR codes easily.</p>
        <Link
          to="/login"
          className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          <FaSignInAlt className="mr-2" />
          Login
        </Link>
      </div>
    </div>
  );
}
