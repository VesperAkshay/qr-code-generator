import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <Link to="/qr-code" className="bg-blue-500 text-white px-4 py-2 rounded">Generate QR Code</Link>
    </div>
  );
}
