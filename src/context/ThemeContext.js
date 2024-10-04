import { createContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem('qr-web-darkMode');
    return storedPreference ? JSON.parse(storedPreference) : false; // Default to false (light theme)
  });

  // To avoid showing toast on initial render
  const isFirstRender = useRef(true);

  // Update localStorage and show toast whenever theme changes (but skip the first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip the first render
    }

    // Update localStorage
    localStorage.setItem('qr-web-darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
