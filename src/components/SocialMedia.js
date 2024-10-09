import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaTiktok,
  FaSnapchatGhost
} from "react-icons/fa";
import { motion } from "framer-motion";

// Assuming you have the logos as local images
import FacebookLogo from "../assets/facebook-logo.png";
import TwitterLogo from "../assets/twitter-logo.png";
import InstagramLogo from "../assets/instagram-logo.png";
import LinkedInLogo from "../assets/linkedin-logo.png";
import WhatsappLogo from "../assets/whatsapp.png";
import TiktokLogo  from "../assets/tik-tok.png";
import SnapchatLogo from "../assets/snapchat.png";

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
  }
];

export default function SocialMedia() {
  const [socialMedia, setSocialMedia] = useState("");
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const qrRef = useRef();

  const handleSocialMediaChange = (platform) => {
    setSocialMedia(platform.name);
    setFgColor(platform.color);
  };

  const selectedPlatform = socialMediaOptions.find(
    (option) => option.name === socialMedia
  );

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div className="p-8 bg-indigo-100 dark:bg-indigo-950 shadow-lg rounded-lg max-w-lg mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-200">
        Generate Social Media QR Code
      </h1>

      <div className="flex flex-wrap justify-center mb-6">
        {socialMediaOptions.map((platform) => (
          <motion.div
            key={platform.name}
            className="relative group"
          >
            <motion.button
              key={platform.name}
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

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your URL or text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:text-gray-200 bg-purple-100 dark:bg-[#2b2661] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold dark:text-gray-200">
          Size
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
              src: selectedPlatform?.logoUrl || "",
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

      <button
        onClick={downloadQRCode}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        Download QR Code
      </button>
    </div>
  );
}
