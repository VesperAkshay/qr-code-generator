'use client'

import React from 'react';
import QRCodeGenerator from '@/app/qr-code/page';

export default function QRCodePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  );
}
