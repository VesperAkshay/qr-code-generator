import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-col">
        <Link to="/qr-code" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Generate QR Code</Link>
        <Link to="/profile" className="bg-green-500 text-white px-4 py-2 rounded">View Profile</Link>
      </div>
    </div>
  );
}
