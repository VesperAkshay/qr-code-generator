import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaTiktok,
  FaSnapchatGhost,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";

// Default logos (can be replaced by uploading custom logos)
import FacebookLogo from "../assets/facebook-logo.png";
import TwitterLogo from "../assets/twitter-logo.png";
import InstagramLogo from "../assets/instagram-logo.png";
import LinkedInLogo from "../assets/linkedin-logo.png";
import WhatsappLogo from "../assets/whatsapp.png";
import TiktokLogo from "../assets/tik-tok.png";
import SnapchatLogo from "../assets/snapchat.png";

// List of social platforms and their properties
const socialMediaOptions = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    color: "#1877F2",
    logoUrl: FacebookLogo,
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    color: "#1DA1F2",
    logoUrl: TwitterLogo,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    color: "#0077B5",
    logoUrl: LinkedInLogo,
  },
  {
    name: "Whatsapp",
    icon: <FaWhatsapp />,
    color: "#25D366",
    logoUrl: WhatsappLogo,
  },
  {
    name: "Snapchat",
    icon: <FaSnapchatGhost />,
    color: "#FFC300",
    logoUrl: SnapchatLogo,
  },
  {
    name: "TikTok",
    icon: <FaTiktok />,
    color: "#FF8C00",
    logoUrl: TiktokLogo,
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    color: "#E1306C",
    logoUrl: InstagramLogo,
  },
];

export default function SocialMediaQRCodeGenerator() {
  const [socialMedia, setSocialMedia] = useState("");
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [customLogo, setCustomLogo] = useState(null);
  const [logoError, setLogoError] = useState("");
  const [gradientFgColor, setGradientFgColor] = useState("#000000");
  const qrRef = useRef();

  // Handle social media platform selection
  const handleSocialMediaChange = (platform) => {
    setSocialMedia(platform.name);
    setFgColor(platform.color);
    setLogoError("");
  };

  // Find the selected social media platform's properties
  const selectedPlatform = socialMediaOptions.find(
    (option) => option.name === socialMedia
  );

  // Handle custom logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setLogoError("");
    } else {
      setLogoError("Please upload a valid image file.");
    }
  };

  // Handle QR code download
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "socialmedia_qrcode.png";
      link.click();
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-100 dark:bg-indigo-950 shadow-lg rounded-lg max-w-2xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-200">
        Generate Social Media QR Code
      </h1>

      {/* Social Media Selection */}
      <div className="flex flex-wrap justify-center mb-6">
        {socialMediaOptions.map((platform) => (
          <motion.div key={platform.name} className="relative group">
            <motion.button
              onClick={() => handleSocialMediaChange(platform)}
              className={`p-4 m-2 rounded-full shadow-lg transition-transform duration-300 ease-in-out ${
                socialMedia === platform.name ? "transform scale-110" : ""
              }`}
              style={{ backgroundColor: platform.color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {platform.icon}
            </motion.button>

            <div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs rounded py-1 px-2"
              style={{ backgroundColor: platform.color }}
            >
              {platform.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* URL Input Field */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold dark:text-gray-200">
          URL or Text
        </label>
        <input
          type="text"
          placeholder="Enter your URL or text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:text-gray-200 bg-purple-100 dark:bg-[#2b2661] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        />
      </div>

      {/* Size Selector */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold dark:text-gray-200">
          QR Code Size
        </label>
        <input
          type="range"
          min="128"
          max="512"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #4f46e5 ${
              ((size - 128) / 384) * 100
            }%, #d1d5db ${((size - 128) / 384) * 100}%)`,
          }}
        />
      </div>

      {/* Background Color Selector */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold dark:text-gray-200">
          Background Color
        </label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full p-1 border border-gray-400 dark:bg-[#2b2661] dark:border-gray-600 rounded-lg cursor-pointer"
        />
      </div>

      {/* Foreground Gradient Color Selector */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold dark:text-gray-200">
          Foreground Gradient Color
        </label>
        <input
          type="color"
          value={gradientFgColor}
          onChange={(e) => setGradientFgColor(e.target.value)}
          className="w-full p-1 border border-gray-400 dark:bg-[#2b2661] dark:border-gray-600 rounded-lg cursor-pointer"
        />
      </div>

      {/* Custom Logo Upload */}
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold dark:text-gray-200">
          Custom Logo (Optional)
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white">
            <FiUpload className="text-3xl" />
            <span className="mt-2 text-base leading-normal">
              Select a file
            </span>
            <input type="file" className="hidden" onChange={handleLogoUpload} />
          </label>
        </div>
        {logoError && <p className="text-red-500 mt-2">{logoError}</p>}
      </div>

      {/* QR Code Preview */}
      <div className="flex justify-center mb-6">
        <div ref={qrRef} className="relative">
          <QRCodeCanvas
            value={text}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level="H"
            includeMargin={false}
            renderAs="canvas"
            imageSettings={{
              src: customLogo || selectedPlatform?.logoUrl || "",
              x: null,
              y: null,
              height: 50,
              width: 50,
              excavate: true,
            }}
            className="border border-gray-200 rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <motion.button
          onClick={downloadQRCode}
          className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download QR Code
        </motion.button>
      </div>
    </div>
  );
}
