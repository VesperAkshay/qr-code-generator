import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the QR Code Generator</h1>
        <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-full">Login</Link>
      </div>
    </div>
  );
}
