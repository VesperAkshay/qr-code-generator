import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import jsQR from 'jsqr';
import { FaClipboard, FaCamera, FaImage, FaTimes, FaCheck } from 'react-icons/fa';

export default function QRScanner() {
  const [scannedData, setScannedData] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(true);

  const handleScan = (data) => {
    if (data) {
      const scannedText = typeof data === 'object' && data.text ? data.text : data;
      setScannedData(scannedText);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setScannedData(code.data);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    setScannedData(''); // Clear scanned data when the camera is toggled
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scannedData)
      .then(() => {
        alert('Copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 flex items-center justify-center">
        <FaCamera className="mr-2" /> QR Code Scanner
      </h1>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
          <FaCamera className="mr-2" /> Scan with Camera
        </h2>
        <button
          onClick={toggleCamera}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center justify-center"
        >
          {isCameraActive ? <FaTimes className="mr-2" /> : <FaCheck className="mr-2" />}
          {isCameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
        {isCameraActive && (
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px' }}
          />
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
          <FaImage className="mr-2" /> Scan from Image
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {scannedData && (
        <div className="bg-green-100 p-4 rounded-lg text-green-800 font-semibold flex items-center justify-between">
          <span>Scanned Data: {scannedData}</span>
          <button onClick={copyToClipboard} className="ml-4 text-blue-600 hover:text-blue-800 flex items-center">
            <FaClipboard size={24} className="mr-2" /> Copy
          </button>
        </div>
      )}
    </div>
  );
}
