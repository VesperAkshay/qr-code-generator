import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaQrcode,
  FaUser,
  FaChartLine,
  FaCog,
  FaLifeRing,
  FaSignOutAlt,
  FaImage,
  FaShareAlt,
  FaBoxes,
  FaFilePdf,
} from "react-icons/fa"; // Import PDF icon
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      to: "/qr-code",
      icon: <FaQrcode />,
      title: "Generate QR Code",
      description: "Create customized QR codes easily.",
      color: "text-white",
      bgColor: "bg-blue-600",
    },
    {
      to: "/image-qr-code",
      icon: <FaImage />,
      title: "Image to QR Code",
      description: "Generate QR codes from images.",
      color: "text-white",
      bgColor: "bg-indigo-600",
    },
    {
      to: "/social-media-qr",
      icon: <FaShareAlt />,
      title: "Social Media QR Code",
      description: "Create QR codes for social media profiles.",
      color: "text-white",
      bgColor: "bg-pink-600",
    },
    {
      to: "/bulk-qr-code",
      icon: <FaBoxes />,
      title: "Bulk QR Code",
      description: "Generate multiple QR codes at once.",
      color: "text-white",
      bgColor: "bg-teal-600",
    },
    {
      to: "/qr-scanner",
      icon: <FaQrcode />,
      title: "QR Code Scanner",
      description: "Scan and decode QR codes.",
      color: "text-white",
      bgColor: "bg-orange-600",
    },
    {
      to: "/pdf-qr-code",
      icon: <FaFilePdf />,
      title: "PDF to QR",
      description: "Convert PDFs to QR codes.",
      color: "text-white",
      bgColor: "bg-red-600",
    },
    {
      to: "/profile",
      icon: <FaUser />,
      title: "View Profile",
      description: "Manage your personal information.",
      color: "text-white",
      bgColor: "bg-green-600",
    },
    {
      to: "/analytics",
      icon: <FaChartLine />,
      title: "View Analytics",
      description: "Analyze your QR code performance.",
      color: "text-white",
      bgColor: "bg-purple-600",
    },
    {
      to: "/settings",
      icon: <FaCog />,
      title: "Settings",
      description: "Adjust your preferences and settings.",
      color: "text-white",
      bgColor: "bg-yellow-600",
    },
    {
      to: "/support",
      icon: <FaLifeRing />,
      title: "Support",
      description: "Get help with any issues.",
      color: "text-white",
      bgColor: "bg-red-600",
    },
  ];

  const handleLogout = async () => {
    // Show a confirmation toast
    const confirmation = toast(
      (t) => (
        <div>
          <p>Are you sure you want to log out?</p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the confirmation toast
              }}
              className="text-blue-600 hover:bg-blue-200 px-4 py-2 bg-blue-100 m-2 mt-4 rounded-md "
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the confirmation toast
                try {
                  await logout(); // Proceed with logout
                  navigate("/"); // Redirect to the home page after logout
                  toast.success("Logged out");
                } catch (error) {
                  console.error("Failed to log out", error);
                  toast.error("Logout failed. Please try again."); // Show an error message
                }
              }}
              className="text-red-600 hover:bg-red-200 px-4 py-2 bg-red-100 m-2 mt-4 rounded-md "
            >
              Log out
            </button>
          </div>
        </div>
      ),
      {
        duration: 0, // Keep the toast open until dismissed
        position: 'top-center', // Adjust position if needed
      }
    )
  };
  
  return (
    <div className="p-2">
    <div
      className="min-h-screen rounded-3xl bg-gradient-to-r p-8 from-violet-500 via-purple-500 to-pink-500 dark:from-violet-950 dark:to-indigo-950"
    >
    {/* bg-gradient-to-r from-[#192646] to-[#00050e] */}
      <h1 className="text-5xl font-extrabold text-center text-white mb-12">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardCards.map(
          ({ to, icon, title, description, color, bgColor }, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 ${bgColor} dark:filter dark:brightness-100 rounded-2xl shadow-lg transition-transform duration-300`}
            >
              <Link to={to} className="text-center flex flex-col items-center">
                <div className={`text-6xl mb-4 ${color} p-4 rounded-full shadow-md transition-transform duration-300`}>
                  {icon}
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {title}
                </h2>
                <p className="text-white">{description}</p>
              </Link>
            </motion.div>
          )
        )}
        <motion.div
          key={-1}
          onClick={handleLogout}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-gray-600 dark:filter dark:brightness-100 rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer"
        >
          <div className="text-center flex flex-col items-center">
            <div className="text-6xl mb-4 text-white p-4 rounded-full shadow-md transition-transform duration-300">
              <FaSignOutAlt />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Logout</h2>
            <p className="text-white">Sign out of your account.</p>
          </div>
        </motion.div>
      </div>
    </div></div>
  );
}
