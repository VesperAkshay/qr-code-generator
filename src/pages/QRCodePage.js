import React from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';

export default function QRCodePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  );
}
