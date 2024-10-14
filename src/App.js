import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/Error404";

import ScrollButton from "./components/ScrollButton"; // Import the ScrollButton

function BackgroundWrapper({ children }) {
  const location = useLocation();

  return (
    <div
      className={`min-h-screen ${
        location.pathname === "/register"
          ? "bg-white"
          : "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800"
      }`}
    >
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
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/qr-code"
                element={
                  <ProtectedRoute>
                    <QRCodePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <ProtectedRoute>
                    <Support />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route path="/more-info" element={<Moreinfo />} />
              <Route
                path="/image-qr-code"
                element={
                  <ProtectedRoute>
                    <ImageQRCodeGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/social-media-qr"
                element={
                  <ProtectedRoute>
                    <SocialMedia />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bulk-qr-code"
                element={
                  <ProtectedRoute>
                    <BulkQRCode />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/qr-scanner"
                element={
                  <ProtectedRoute>
                    <QRScanner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pdf-qr-code"
                element={
                  <ProtectedRoute>
                    <PdfQRCodeGenerator />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ScrollButton />
          </BackgroundWrapper>
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
