import React from 'react';

export default function SizeSlider({ size, setSize }) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-gray-700">Size</label>
      <input
        type="range"
        min="100"
        max="600"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="w-full"
      />
      <span className="block text-center text-gray-600">{size}px</span>
    </div>
  );
}
