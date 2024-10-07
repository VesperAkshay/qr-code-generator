import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import { motion } from "framer-motion";
import CategorySelector from "./CategorySelector";
import VCardForm from "./VCardForm";
import WifiForm from "./WifiForm";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import FileUploader from "./FileUploader";
import DownloadButton from "./DownloadButton";
import toast from "react-hot-toast";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logoFile, setLogoFile] = useState(null);
  const [size, setSize] = useState(300);
  const [shape, setShape] = useState("square");
  const [frame, setFrame] = useState("square");
  const [eyeShape, setEyeShape] = useState("square");
  const [eyeColor, setEyeColor] = useState("#000000");
  const [category, setCategory] = useState("text");
  const [vCardDetails, setVCardDetails] = useState({
    fullName: "",
    organization: "",
    phone: "",
    email: "",
  });
  const [wifiDetails, setWifiDetails] = useState({
    ssid: "",
    encryption: "WPA",
    password: "",
  });

  const qrCodeRef = useRef(null);
  const qrCodeInstance = useRef(null); // To keep QR code instance reference
  const [downloadFormat, setDownloadFormat] = useState("png");
  const [qrGenerated, setQrGenerated] = useState(false); // State to track if QR code is generated

  // Initialize QRCodeStyling instance once
  if (!qrCodeInstance.current) {
    qrCodeInstance.current = new QRCodeStyling({
      width: size,
      height: size,
      data: "",
      dotsOptions: { color: color, type: shape },
      cornersSquareOptions: { type: frame },
      cornersDotOptions: { type: eyeShape, color: eyeColor },
      backgroundOptions: { color: bgColor },
    });
  }

  const handleGenerate = async () => {
    // Check for required fields based on selected category
    if (category === "vCard") {
      if (
        !vCardDetails.fullName ||
        !vCardDetails.organization ||
        !vCardDetails.phone ||
        !vCardDetails.email
      ) {
        toast.error("Please fill in all fields for vCard.");
        return;
      }
      setText(
        `BEGIN:VCARD\nVERSION:3.0\nFN:${vCardDetails.fullName}\nORG:${vCardDetails.organization}\nTEL:${vCardDetails.phone}\nEMAIL:${vCardDetails.email}\nEND:VCARD`
      );
    } else if (category === "wifi") {
      if (!wifiDetails.ssid || !wifiDetails.password) {
        toast.error("Please fill in the SSID and password for WiFi.");
        return;
      }
      setText(
        `WIFI:T:${wifiDetails.encryption};S:${wifiDetails.ssid};P:${wifiDetails.password};;`
      );
    } else if (category === "text" || category === "URL") {
      if (!text.trim()) {
        toast.error(`Please fill in ${category} field.`);
        return;
      }
      if (category === "URL") {
        const urlPattern = new RegExp(
          '^(https?:\\/\\/)?' + // validate the protocol
          '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP address
          '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?' + // port and path
          '(\\?[;&a-zA-Z0-9%_+.~#?&//=]*)?' + // query string
          '(\\#[-a-zA-Z0-9_]*)?$','i' // fragment locator
        );
        
        if (!urlPattern.test(text.trim())) {
          toast.error("Invalid URL. Please enter a valid URL.");
          return;
        }
      }
    }

    setQrGenerated(false); // Reset QR generated state

    // Clear previous QR code if present
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
    }

    // Create a promise to handle logo loading if applicable
    const updateQRCode = (logoURL = "") => {
      qrCodeInstance.current.update({
        data: text,
        dotsOptions: { color, type: shape },
        cornersSquareOptions: { type: frame },
        cornersDotOptions: { type: eyeShape, color: eyeColor },
        backgroundOptions: { color: bgColor },
        image: logoURL, // Use logo URL if present
      });

      qrCodeInstance.current.append(qrCodeRef.current);

      // Delay a bit to ensure it's appended, then update state
      setTimeout(() => {
        setQrGenerated(true); // Mark QR code as generated
      }, 500); // Set delay to ensure QR is rendered
    };

    if (logoFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoURL = event.target.result;
        updateQRCode(logoURL);
      };
      reader.readAsDataURL(logoFile);
    } else {
      updateQRCode(); // No logo case
    }
  };

  const handleDownload = () => {
    qrCodeInstance.current.download({
      name: "qr_code",
      extension: downloadFormat,
    });
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setQrGenerated(false); // Reset QR generated state
    setText(""); // Clear text input

    // Clear previous QR code if present
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = "";
    }

    if (category === "vCard") {
      setText(
        `BEGIN:VCARD\nVERSION:3.0\nFN:${vCardDetails.fullName}\nORG:${vCardDetails.organization}\nTEL:${vCardDetails.phone}\nEMAIL:${vCardDetails.email}\nEND:VCARD`
      );
    } else if (category === "URL") {
      setText("");
    } else if (category === "wifi") {
      setText(
        `WIFI:T:${wifiDetails.encryption};S:${wifiDetails.ssid};P:${wifiDetails.password};;`
      );
    } else if (category === "text") {
      setText("");
    }
  };

  return (
    <motion.div
      className="p-8 max-w-lg mx-auto bg-purple-100 dark:bg-indigo-950 rounded-xl shadow-lg mt-10"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
      >
        Generate QR Code
      </motion.h1>

      <CategorySelector
        category={category}
        handleCategoryChange={handleCategoryChange}
      />

      {category === "vCard" && (
        <VCardForm
          vCardDetails={vCardDetails}
          setVCardDetails={setVCardDetails}
          setText={setText}
        />
      )}
      {category === "wifi" && (
        <WifiForm
          wifiDetails={wifiDetails}
          setWifiDetails={setWifiDetails}
          setText={setText}
        />
      )}
      {(category === "text" || category === "URL") && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <label className="block mb-2 text-gray-700 dark:text-gray-200 capitalize">
            {category} Input
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            className="w-full dark:bg-[#2b2661] dark:text-gray-200 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg"
            placeholder={`Enter ${category}`}
          />
        </motion.div>
      )}

      <SizeSlider size={size} setSize={setSize} />
      <ColorPicker
        color={color}
        setColor={setColor}
        bgColor={bgColor}
        setBgColor={setBgColor}
        eyeColor={eyeColor}
        setEyeColor={setEyeColor}
        shape={shape}
        setShape={setShape}
        frame={frame}
        setFrame={setFrame}
        eyeShape={eyeShape}
        setEyeShape={setEyeShape}
      />
      <FileUploader handleLogoChange={(e) => setLogoFile(e.target.files[0])} />

      <motion.button
        onClick={handleGenerate}
        className="bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 mb-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Generate QR Code
      </motion.button>

      {/* QR code will appear only if it's been generated */}
      <div className="flex justify-center items-center" ref={qrCodeRef}></div>

      {/* Only show download options if QR code has been generated */}
      {qrGenerated && (
        <DownloadButton
          handleDownload={handleDownload}
          downloadFormat={downloadFormat}
          setDownloadFormat={setDownloadFormat}
        />
      )}
    </motion.div>
  );
}
