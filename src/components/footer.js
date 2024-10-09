import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <p className="font-bold">Follow Us</p>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
        <div className="mb-4">
          <p>QR Generator - The easiest way to generate QR codes.</p>
        </div>
        <div>
          <p>Contact us: support@qrgenerator.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;