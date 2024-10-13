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
           
            <Chatbot />
          </BackgroundWrapper>
          <Toaster />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
