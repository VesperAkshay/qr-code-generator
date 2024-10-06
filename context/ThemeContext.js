"use client";  

import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    
    const storedPreference = localStorage.getItem('qr-web-darkMode');
    setDarkMode(storedPreference ? JSON.parse(storedPreference) : false); 
  }, []); 

  
  useEffect(() => {
    localStorage.setItem('qr-web-darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
