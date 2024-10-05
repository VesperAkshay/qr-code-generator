import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { storage } from '../firebase'; // Assuming you have already set up Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaCloudUploadAlt, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ImageQRCodeGenerator() {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [qrCodeURL, setQRCodeURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [qrColor, setQrColor] = useState('#000000');
  const [qrSize, setQrSize] = useState(256);
  const qrRef = useRef();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setIsUploading(true);

      // Create a storage reference
      const storageRef = ref(storage, `images/${file.name}`);
      
      // Upload the image
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      setImageURL(downloadURL);
      setQRCodeURL(downloadURL);
      setIsUploading(false);
    }
  };

  const handleDownloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    link.click();
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">Image to QR Code Generator</h1>
      <div className="max-w-md mx-auto bg-indigo-200 dark:bg-purple-950 rounded-2xl shadow-lg p-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="border-2 border-dashed border-gray-600 dark:border-gray-300 p-6 rounded-xl text-center"
        >
          <label className="cursor-pointer">
            <FaCloudUploadAlt className="text-6xl text-gray-600 dark:text-gray-300 mx-auto mb-4" />
            <span className="block text-gray-600 dark:text-gray-300 font-medium mb-2">Click to upload image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </motion.div>
        {isUploading && <p className="text-center text-gray-600 dark:text-gray-300 mt-4">Uploading...</p>}
        {imageFile && !isUploading && (
          <>
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Image Preview:</h2>
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full rounded-lg shadow" />
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">QR Code Customization:</h2>
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">Color</label>
                  <input 
                    type="color" 
                    value={qrColor} 
                    onChange={(e) => setQrColor(e.target.value)} 
                    className="w-full cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">Size</label>
                  <input 
                    type="number" 
                    value={qrSize} 
                    onChange={(e) => setQrSize(Number(e.target.value))} 
                    min="128" 
                    max="512" 
                    className="w-full p-2 border border-gray-400 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bolddark:text-gray-200 text-gray-800 mb-2">Generated QR Code:</h2>
              <div ref={qrRef} className="flex justify-center">
                <QRCode value={qrCodeURL} size={qrSize} fgColor={qrColor} />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={handleDownloadQRCode} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-lg"
              >
                <FaDownload className="mr-2" /> Download QR Code
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
