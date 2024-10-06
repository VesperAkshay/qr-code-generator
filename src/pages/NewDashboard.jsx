import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom'; // Import Link
import { FaQrcode } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { IoMdQrScanner } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { BsInfo } from "react-icons/bs";
import { IoIosMoon } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";
import { IoAnalytics } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
// Import your components
import QRCodePage from '../components/QRCodeGenerator.js';
import ImgQRCode from '../components/ImageQRCodeGenerator.js';
import SocialMedia from '../components/SocialMedia';
import BulkQRCode from '../components/BulkQRCode';
import QRScanner from '../components/QRScanner';
import PdfQRCodeGenerator from '../components/PDFToQR';

const NewDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null); // State to track the active component

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'qrCode':
        return <QRCodePage />;
      case 'imageQRCode':
        return <ImgQRCode />;
      case 'socialMedia':
        return <SocialMedia />;
      case 'bulkQRCode':
        return <BulkQRCode />;
      case 'pdfQRCode':
        return <PdfQRCodeGenerator />;
      case 'qrScanner':
        return <QRScanner />;
      default:
        return null; // Render nothing if no component is selected
    }
  };

  return (
    <div>
      <div className="bg-black min-h-[calc(100vh-65px)] h-auto flex">
        {/* Left Sidebar */}
        <div className="h-96 w-24 bg-gray-700 rounded-r-3xl fixed top-48 left-0">
          <div className="h-full text-3xl flex flex-col justify-evenly items-center">
            <span 
              className="cursor-pointer hover:text-blue-500 active:text-purple-900"
              onClick={() => setActiveComponent('qrCode')} // Set the active component to QR Code
            >
              <FaQrcode />
            </span>
            <span 
              className="cursor-pointer hover:text-blue-500 active:text-purple-900"
              onClick={() => setActiveComponent('imageQRCode')} // Set the active component to Image QR Code
            >
              <FaImage />
            </span>
            <span 
              className="cursor-pointer hover:text-blue-500 active:text-purple-900"
              onClick={() => setActiveComponent('socialMedia')} // Set the active component to Social Media
            >
              <IoShareSocialSharp />
            </span>
            <span 
              className="cursor-pointer hover:text-blue-500 active:text-purple-900"
              onClick={() => setActiveComponent('bulkQRCode')} // Set the active component to Bulk QR Code
            >
              <FaBoxes />
            </span>
            <span 
              className="cursor-pointer hover:text-blue-500 active:text-purple-900"
              onClick={() => setActiveComponent('qrScanner')} // Set the active component to QR Scanner
            >
              <IoMdQrScanner />
            </span>
            <span 
              className="cursor-pointer hover:text-blue-500 active:text-purple-900"
              onClick={() => setActiveComponent('pdfQRCode')} // Set the active component to PDF QR Generator
            >
              <FaFilePdf />
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex justify-center items-center">
          <main className="w-auto h-auto">
            {renderActiveComponent()} {/* Render the active component */}
          </main>
        </div>

        {/* Right Sidebar */}
        <div className="h-screen w-20 flex flex-col items-center gap-6 bg-gray-700 fixed top-16 right-0">
         <Link to={"/profile"} className='my-4'>
         <span className="text-black text-3xl cursor-pointer hover:text-blue-500 ">
            <RiUserFill />
          </span>
         </Link>
          <Link to={"/analytics"}>
          <span className="text-black text-3xl cursor-pointer hover:text-blue-500">
            <IoAnalytics />
          </span>
          </Link>
          <Link to={"/support"}>
          <span className="text-black text-3xl cursor-pointer hover:text-blue-500 relative top-96">
            <BiSupport />
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
