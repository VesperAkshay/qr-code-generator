import React from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaUser, FaChartLine, FaCog, FaLifeRing, FaSignOutAlt, FaImage, FaShareAlt, FaBoxes } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-8">
      <h1 className="text-5xl font-extrabold text-center text-white mb-12">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { to: "/qr-code", icon: <FaQrcode />, title: "Generate QR Code", description: "Create customized QR codes easily.", color: "text-white", bgColor: "bg-blue-600" },
          { to: "/image-qr-code", icon: <FaImage />, title: "Image to QR Code", description: "Generate QR codes from images.", color: "text-white", bgColor: "bg-indigo-600" },
          { to: "/social-media-qr", icon: <FaShareAlt />, title: "Social Media QR Code", description: "Create QR codes for social media profiles.", color: "text-white", bgColor: "bg-pink-600" },
          { to: "/bulk-qr-code", icon: <FaBoxes />, title: "Bulk QR Code", description: "Generate multiple QR codes at once.", color: "text-white", bgColor: "bg-teal-600" },
          { to: "/qr-scanner", icon: <FaQrcode />, title: "QR Code Scanner", description: "Scan and decode QR codes.", color: "text-white", bgColor: "bg-orange-600" }, // New QR Code Scanner Section
          { to: "/profile", icon: <FaUser />, title: "View Profile", description: "Manage your personal information.", color: "text-white", bgColor: "bg-green-600" },
          { to: "/analytics", icon: <FaChartLine />, title: "View Analytics", description: "Analyze your QR code performance.", color: "text-white", bgColor: "bg-purple-600" },
          { to: "/settings", icon: <FaCog />, title: "Settings", description: "Adjust your preferences and settings.", color: "text-white", bgColor: "bg-yellow-600" },
          { to: "/support", icon: <FaLifeRing />, title: "Support", description: "Get help with any issues.", color: "text-white", bgColor: "bg-red-600" },
          { to: "/logout", icon: <FaSignOutAlt />, title: "Logout", description: "Sign out of your account.", color: "text-white", bgColor: "bg-gray-600" },
        ].map(({ to, icon, title, description, color, bgColor }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 ${bgColor} rounded-2xl shadow-lg transition-transform duration-300`}
          >
            <Link to={to} className="text-center flex flex-col items-center">
              <div className={`text-6xl mb-4 ${color} p-4 rounded-full shadow-md transition-transform duration-300`}>
                {icon}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
              <p className="text-white">{description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
