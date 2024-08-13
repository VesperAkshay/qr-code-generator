import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">Welcome to the QR Code Generator</h1>
        <p className="text-lg mb-8 text-gray-600">Create and customize your own QR codes easily.</p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
