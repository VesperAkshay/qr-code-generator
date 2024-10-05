import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { FiPlus, FiDownload, FiTrash, FiSettings } from 'react-icons/fi';

export default function BulkQRCode() {
  const [urls, setUrls] = useState(['']);
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleUrlChange = (index, newUrl) => {
    const newUrls = [...urls];
    newUrls[index] = newUrl;
    setUrls(newUrls);
  };

  const downloadQRCode = (index) => {
    const canvas = document.getElementById(`qrcode-${index}`);
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qrcode-${index + 1}.png`;
      link.click();
    }
  };

  const downloadAllQRCodes = () => {
    urls.forEach((_, index) => downloadQRCode(index));
  };

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value, 10));
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-5xl font-extrabold text-center text-white mb-12">
        Bulk QR Code Generator
      </h1>

      <div className="bg-purple-100 dark:text-gray-200 dark:bg-[#2b2661] p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FiSettings className="mr-2" /> Customize QR Codes
        </h2>
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex flex-col">
            <label htmlFor="size" className="mb-2 text-lg">Size:</label>
            <input
              id="size"
              type="number"
              value={size}
              onChange={handleSizeChange}
              className="p-3 border dark:bg-indigo-950 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={64}
              max={512}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bgColor" className="mb-2 text-lg">Background Color:</label>
            <input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="p-3 border dark:bg-indigo-950 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fgColor" className="mb-2 text-lg">Foreground Color:</label>
            <input
              id="fgColor"
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="p-3 border dark:bg-indigo-950 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        {urls.map((url, index) => (
          <div key={index} className="bg-purple-100 dark:bg-[#2b2661] p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <input
                type="text"
                placeholder={`Enter URL or text for QR code ${index + 1}`}
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                className="w-full p-3 border dark:bg-indigo-950 dark:text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4 flex justify-center">
              <QRCodeCanvas
                id={`qrcode-${index}`}
                value={url}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={false}
                className="border border-gray-200 rounded-lg shadow-md"
              />
            </div>

            <div className="flex justify-between items-center">
              <motion.button
                onClick={() => downloadQRCode(index)}
                className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="mr-2" /> Download QR Code
              </motion.button>
              {urls.length > 1 && (
                <motion.button
                  onClick={() => handleRemoveUrl(index)}
                  className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiTrash className="mr-2" /> Remove
                </motion.button>
              )}
            </div>
          </div>
        ))}

        <motion.button
          onClick={handleAddUrl}
          className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 self-center flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus className="mr-2" /> Add Another QR Code
        </motion.button>

        <motion.button
          onClick={downloadAllQRCodes}
          className="bg-yellow-600 text-white p-3 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 self-center flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiDownload className="mr-2" /> Download All QR Codes
        </motion.button>
      </div>
    </div>
  );
}
