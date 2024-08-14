import React from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaUser, FaChartLine, FaCog, FaLifeRing, FaSignOutAlt } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/qr-code" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            <FaQrcode className="inline-block mr-2 text-2xl" /> Generate QR Code
          </h2>
          <p className="text-gray-600">Create customized QR codes easily.</p>
        </Link>
        <Link to="/profile" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            <FaUser className="inline-block mr-2 text-2xl" /> View Profile
          </h2>
          <p className="text-gray-600">Manage your personal information.</p>
        </Link>
        <Link to="/analytics" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">
            <FaChartLine className="inline-block mr-2 text-2xl" /> View Analytics
          </h2>
          <p className="text-gray-600">Analyze your QR code performance.</p>
        </Link>
        <Link to="/settings" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">
            <FaCog className="inline-block mr-2 text-2xl" /> Settings
          </h2>
          <p className="text-gray-600">Adjust your preferences and settings.</p>
        </Link>
        <Link to="/support" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            <FaLifeRing className="inline-block mr-2 text-2xl" /> Support
          </h2>
          <p className="text-gray-600">Get help with any issues.</p>
        </Link>
        <Link to="/logout" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            <FaSignOutAlt className="inline-block mr-2 text-2xl" /> Logout
          </h2>
          <p className="text-gray-600">Sign out of your account.</p>
        </Link>
      </div>
    </div>
  );
}
