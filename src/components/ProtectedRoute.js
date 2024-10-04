

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebase'; // Ensure the correct import

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user has verified their email
        setIsAuthorized(user.emailVerified);
      } else {
        setIsAuthorized(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
