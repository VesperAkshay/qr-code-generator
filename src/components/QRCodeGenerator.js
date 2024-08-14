import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faLink, faAddressCard, faWifi, faDownload } from '@fortawesome/free-solid-svg-icons';

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

  const handleVCardInputChange = (e) => {
    const { name, value } = e.target;
    setVCardDetails({ ...vCardDetails, [name]: value });
    setText(`BEGIN:VCARD\nVERSION:3.0\nFN:${vCardDetails.fullName}\nORG:${vCardDetails.organization}\nTEL:${vCardDetails.phone}\nEMAIL:${vCardDetails.email}\nEND:VCARD`);
  };

  const handleWifiInputChange = (e) => {
    const { name, value } = e.target;
    setWifiDetails({ ...wifiDetails, [name]: value });
    setText(`WIFI:T:${wifiDetails.encryption};S:${wifiDetails.ssid};P:${wifiDetails.password};;`);
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleDownloadFormatChange = (e) => {
    setDownloadFormat(e.target.value);
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-10 transition-transform transform hover:scale-105 duration-300">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Generate QR Code</h1>

      <div className="flex justify-between mb-6">
        {['text', 'URL', 'vCard', 'wifi'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`p-3 rounded-lg font-medium focus:outline-none transition-colors duration-200 ${
              category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FontAwesomeIcon icon={cat === 'text' ? faFileAlt : cat === 'URL' ? faLink : cat === 'vCard' ? faAddressCard : faWifi} />
            <span className="ml-2 capitalize">{cat}</span>
          </button>
        ))}
      </div>

      {category === 'vCard' && (
        <div className="space-y-4 mb-6">
          {['fullName', 'organization', 'phone', 'email'].map((field) => (
            <div key={field}>
              <label className="block mb-2 text-gray-700 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                placeholder={field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                value={vCardDetails[field]}
                onChange={handleVCardInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          ))}
        </div>
      )}

      {category === 'wifi' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-2 text-gray-700">SSID</label>
            <input
              type="text"
              name="ssid"
              placeholder="Wi-Fi Name"
              value={wifiDetails.ssid}
              onChange={handleWifiInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Encryption</label>
            <select
              name="encryption"
              value={wifiDetails.encryption}
              onChange={handleWifiInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Wi-Fi Password"
              value={wifiDetails.password}
              onChange={handleWifiInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      )}

      {(category === 'text' || category === 'URL') && (
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 capitalize">{category} Input</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder={`Enter ${category}`}
          />
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-2 text-gray-700">QR Code Size</label>
          <input
            type="range"
            min="100"
            max="500"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2 text-gray-600">{size}px</div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-2 text-gray-700">QR Code Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-gray-700">Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 rounded-lg"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-2 text-gray-700">Pattern Shape</label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-gray-700">Frame Shape</label>
            <select
              value={frame}
              onChange={(e) => setFrame(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-2 text-gray-700">Eye Shape</label>
            <select
              value={eyeShape}
              onChange={(e) => setEyeShape(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-gray-700">Eye Color</label>
            <input
              type="color"
              value={eyeColor}
              onChange={(e) => setEyeColor(e.target.value)}
              className="w-full h-10 rounded-lg"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Upload Logo</label>
          <input
            type="file"
            onChange={handleLogoChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Download Format</label>
          <select
            value={downloadFormat}
            onChange={handleDownloadFormatChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="svg">SVG</option>
          </select>
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleGenerate}
          className="w-full p-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Generate QR Code
        </button>
      </div>

      <div ref={qrCodeRef} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-inner flex justify-center"></div>

      <div className="text-center">
        <button
          onClick={handleDownload}
          className="w-full p-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />Download QR Code
        </button>
      </div>
    </div>
  );
}
