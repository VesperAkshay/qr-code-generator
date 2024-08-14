import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';

export default function Support() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send the data to an API)
    setSuccess('Your message has been sent successfully!');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full space-y-6 transition-transform transform hover:scale-105">
        <div className="flex items-center justify-center">
          <BiSupport className="text-blue-600 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Support</h1>
        <p className="text-center text-gray-600">Have any questions or need help? Fill out the form below, and we will get back to you as soon as possible.</p>
        
        {success && <p className="text-green-500 text-center font-semibold">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your message"
              rows="5"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300 shadow-md"
          >
            <FiSend className="w-5 h-5" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
