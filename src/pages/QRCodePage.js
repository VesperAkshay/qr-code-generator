import React from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';

export default function QRCodePage() {
  return (
    <div className="p-6  bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
      <h1 className="text-3xl font-bold mb-4 dark:text-gray-100 text-center">QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  );
}
