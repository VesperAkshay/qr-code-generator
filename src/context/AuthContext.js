


import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user is verified
        if (user.emailVerified) {
          setCurrentUser(user);
        } else {
          // If not verified, set currentUser to null
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,  // Expose setCurrentUser
    logout,
    loading,  // Expose loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Prevent rendering until loading is false */}
    </AuthContext.Provider>
  );
}
