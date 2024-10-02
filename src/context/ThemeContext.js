import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Check localStorage for the darkMode preference on initial load
  const [darkMode, setDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem('qr-web-darkMode');
    return storedPreference ? JSON.parse(storedPreference) : false; // Default to false(light theme)
  });

  // Update localStorage whenever it changes
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
