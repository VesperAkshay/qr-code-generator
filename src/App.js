import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import QRCodePage from "./pages/QRCodePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import Support from "./components/Support";
import Settings from "./components/Setting";
import ImageQRCodeGenerator from "./components/ImageQRCodeGenerator";
import SocialMedia from "./components/SocialMedia";
import BulkQRCode from "./components/BulkQRCode";
import Moreinfo from "./components/Moreinfo";
import QRScanner from "./components/QRScanner";
import PdfQRCodeGenerator from "./components/PDFToQR";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute';

function BackgroundWrapper({children}) {
  const location = useLocation();

  return (
    <div className={`min-h-screen ${location.pathname === "/register" ? "bg-white" : "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800"}`}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <BackgroundWrapper>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/qr-code" element={<QRCodePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/support" element={<Support />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/more-info" element={<Moreinfo />} />
              <Route path="/image-qr-code" element={<ImageQRCodeGenerator />} />
              <Route path="/social-media-qr" element={<SocialMedia />} />
              <Route path="/bulk-qr-code" element={<BulkQRCode />} />
              <Route path="/qr-scanner" element={<QRScanner />} />
              <Route path="/pdf-qr-code" element={<PdfQRCodeGenerator />} />
            </Routes>
          </BackgroundWrapper>
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}