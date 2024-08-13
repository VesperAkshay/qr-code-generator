import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState('');
  const [size, setSize] = useState(300);
  const [shape, setShape] = useState('square');
  const [frame, setFrame] = useState('square');
  const [category, setCategory] = useState('text');
  const qrCodeRef = useRef(null);
  const downloadRef = useRef(null);
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
      image: logo,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
      }
    });
    setQrCode(qrCodeInstance);
  }, [text, color, bgColor, logo, size, shape, frame]);

  const handleGenerate = async () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = ''; // Clear the previous QR code
    }

    qrCode.update({
      data: text,
      dotsOptions: { color, type: shape },
      cornersSquareOptions: { type: frame },
      backgroundOptions: { color: bgColor },
      image: logo
    });

    qrCode.append(qrCodeRef.current);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generate QR Code</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded"
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
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block mb-2">QR Code Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Size</label>
        <input
          type="number"
          placeholder="Enter size (e.g., 300)"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Pattern Shape</label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Frame Shape</label>
        <select
          value={frame}
          onChange={(e) => setFrame(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="square">Square</option>
          <option value="dot">Dot</option>
          <option value="rounded">Rounded</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Logo (URL)</label>
        <input
          type="text"
          placeholder="Enter logo URL"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="bg-green-500 text-white px-4 py-2 rounded mr-4"
      >
        Generate
      </button>
      <button
        onClick={handleDownload}
        ref={downloadRef}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download
      </button>
      
      <div ref={qrCodeRef} className="mt-6"></div>
    </div>
  );
}
