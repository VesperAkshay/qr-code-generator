import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { motion } from 'framer-motion';
import CategorySelector from './CategorySelector';
import VCardForm from './VCardForm';
import WifiForm from './WifiForm';
import ColorPicker from './ColorPicker';
import QRCodeCanvas from './QRCodeCanvas';
import SizeSlider from './SizeSlider';
import FileUploader from './FileUploader';
import DownloadButton from './DownloadButton';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoFile, setLogoFile] = useState(null);
  const [size, setSize] = useState(300);
  const [shape, setShape] = useState('square');
  const [frame, setFrame] = useState('square');
  const [eyeShape, setEyeShape] = useState('square');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [category, setCategory] = useState('text');
  const [vCardDetails, setVCardDetails] = useState({
    fullName: '',
    organization: '',
    phone: '',
    email: '',
  });
  const [wifiDetails, setWifiDetails] = useState({
    ssid: '',
    encryption: 'WPA',
    password: '',
  });
  const qrCodeRef = useRef(null);
  const { currentUser } = useAuth();
  const [qrCode, setQrCode] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState('png');

  useEffect(() => {
    const qrCodeInstance = new QRCodeStyling({
      width: size,
      height: size,
      data: text,
      dotsOptions: { color, type: shape },
      cornersSquareOptions: { type: frame },
      cornersDotOptions: { type: eyeShape, color: eyeColor },
      backgroundOptions: { color: bgColor },
    });
    setQrCode(qrCodeInstance);
  }, [text, color, bgColor, size, shape, frame, eyeShape, eyeColor]);

  const handleGenerate = async () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = ''; // Clear the previous QR code
    }

    let logoURL = '';
    if (logoFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        logoURL = event.target.result;
        qrCode.update({
          data: text,
          dotsOptions: { color, type: shape },
          cornersSquareOptions: { type: frame },
          cornersDotOptions: { type: eyeShape, color: eyeColor },
          backgroundOptions: { color: bgColor },
          image: logoURL,
        });
        qrCode.append(qrCodeRef.current);
      };
      reader.readAsDataURL(logoFile);
    } else {
      qrCode.update({
        data: text,
        dotsOptions: { color, type: shape },
        cornersSquareOptions: { type: frame },
        cornersDotOptions: { type: eyeShape, color: eyeColor },
        backgroundOptions: { color: bgColor },
      });
      qrCode.append(qrCodeRef.current);
    }

    const userRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData.qrCount >= 10) {
        alert("You have reached the daily limit of QR codes.");
      } else {
        await updateDoc(userRef, { qrCount: userData.qrCount + 1 });
      }
    } else {
      await setDoc(userRef, { qrCount: 1 });
    }
  };

  const handleDownload = () => {
    qrCode.download({ name: "qr_code", extension: downloadFormat });
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (category === 'vCard') {
      setText(`BEGIN:VCARD\nVERSION:3.0\nFN:${vCardDetails.fullName}\nORG:${vCardDetails.organization}\nTEL:${vCardDetails.phone}\nEMAIL:${vCardDetails.email}\nEND:VCARD`);
    } else if (category === 'URL') {
      setText('https://example.com');
    } else if (category === 'wifi') {
      setText(`WIFI:T:${wifiDetails.encryption};S:${wifiDetails.ssid};P:${wifiDetails.password};;`);
    } else if (category === 'text') {
      setText('');
    }
  };

  return (
    <motion.div
      className="p-8 max-w-lg mx-auto bg-indigo-100 dark:bg-indigo-950 rounded-xl shadow-lg mt-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
      >
        Generate QR Code
      </motion.h1>

      <CategorySelector category={category} handleCategoryChange={handleCategoryChange} />

      {category === 'vCard' && (
        <VCardForm vCardDetails={vCardDetails} setVCardDetails={setVCardDetails} setText={setText} />
      )}
      {category === 'wifi' && (
        <WifiForm wifiDetails={wifiDetails} setWifiDetails={setWifiDetails} setText={setText} />
      )}
      {(category === 'text' || category === 'URL') && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        >
          <label className="block mb-2 text-gray-700 dark:text-gray-200 capitalize">
            {category} Input
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            className="w-full dark:bg-[#2b2661] dark:text-gray-200 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-lg"
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
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        Generate QR Code
      </motion.button>

      <DownloadButton
        handleDownload={handleDownload}
        downloadFormat={downloadFormat}
        setDownloadFormat={setDownloadFormat}
      />

      <QRCodeCanvas qrCodeRef={qrCodeRef} />
    </motion.div>
  );
}
