import React from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaUser, FaChartLine, FaCog, FaLifeRing, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { to: "/qr-code", icon: <FaQrcode />, title: "Generate QR Code", description: "Create customized QR codes easily.", color: "text-blue-600" },
          { to: "/profile", icon: <FaUser />, title: "View Profile", description: "Manage your personal information.", color: "text-green-600" },
          { to: "/analytics", icon: <FaChartLine />, title: "View Analytics", description: "Analyze your QR code performance.", color: "text-purple-600" },
          { to: "/settings", icon: <FaCog />, title: "Settings", description: "Adjust your preferences and settings.", color: "text-yellow-600" },
          { to: "/support", icon: <FaLifeRing />, title: "Support", description: "Get help with any issues.", color: "text-red-600" },
          { to: "/logout", icon: <FaSignOutAlt />, title: "Logout", description: "Sign out of your account.", color: "text-gray-600" },
        ].map(({ to, icon, title, description, color }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="p-6 bg-white rounded-2xl shadow-lg"
          >
            <Link to={to} className="text-center">
              <div className={`text-5xl mb-4 ${color}`}>{icon}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
