import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/qr-code" className="bg-blue-500 text-white px-4 py-6 rounded shadow-lg hover:bg-blue-600 transition duration-300 text-center">
          Generate QR Code
        </Link>
        <Link to="/profile" className="bg-green-500 text-white px-4 py-6 rounded shadow-lg hover:bg-green-600 transition duration-300 text-center">
          View Profile
        </Link>
        <Link to="/analytics" className="bg-purple-500 text-white px-4 py-6 rounded shadow-lg hover:bg-purple-600 transition duration-300 text-center">
          View Analytics
        </Link>
        <Link to="/settings" className="bg-yellow-500 text-white px-4 py-6 rounded shadow-lg hover:bg-yellow-600 transition duration-300 text-center">
          Settings
        </Link>
        <Link to="/support" className="bg-red-500 text-white px-4 py-6 rounded shadow-lg hover:bg-red-600 transition duration-300 text-center">
          Support
        </Link>
        <Link to="/logout" className="bg-gray-500 text-white px-4 py-6 rounded shadow-lg hover:bg-gray-600 transition duration-300 text-center">
          Logout
        </Link>
      </div>
    </div>
  );
}
