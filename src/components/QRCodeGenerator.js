import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logoFile, setLogoFile] = useState(null);
  const [size, setSize] = useState(300);
  const [shape, setShape] = useState('square');
  const [frame, setFrame] = useState('square');
  const [category, setCategory] = useState('text');
  const qrCodeRef = useRef(null);
  const { currentUser } = useAuth();
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const qrCodeInstance = new QRCodeStyling({
      width: size,
      height: size,
      data: text,
      dotsOptions: { color, type: shape },
      cornersSquareOptions: { type: frame },
      backgroundOptions: { color: bgColor },
    });
    setQrCode(qrCodeInstance);
  }, [text, color, bgColor, size, shape, frame]);

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
    qrCode.download({ name: "qr_code", extension: "png" });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === 'vCard') {
      setText('BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Company\nTEL:1234567890\nEMAIL:john.doe@example.com\nEND:VCARD');
    } else if (e.target.value === 'URL') {
      setText('https://example.com');
    } else if (e.target.value === 'text') {
      setText('');
    }
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Generate QR Code</h1>
      
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="URL">URL</option>
          <option value="vCard">vCard</option>
        </select>
      </div>
      
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block mb-2 text-gray-700">QR Code Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="border rounded focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Size</label>
        <input
          type="number"
          placeholder="Enter size (e.g., 300)"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Pattern Shape</label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Frame Shape</label>
        <select
          value={frame}
          onChange={(e) => setFrame(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="square">Square</option>
          <option value="dot">Dot</option>
          <option value="rounded">Rounded</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Logo (Upload Image)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleGenerate}
          className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-600"
        >
          Generate
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-600"
        >
          Download
        </button>
      </div>

      <div ref={qrCodeRef} className="mt-6 flex justify-center"></div>
    </div>
  );
}
