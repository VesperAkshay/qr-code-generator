<<<<<<< HEAD
// src/context/ThemeContext.js
import { createContext, useState, useEffect } from 'react';
=======
import { createContext, useState, useEffect, useRef } from 'react';
>>>>>>> c0c44062d6d49f810b75cec4038488603368bc6c

// Create the context
export const ThemeContext = createContext();

<<<<<<< HEAD
// ThemeContext provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
  };
=======
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
>>>>>>> c0c44062d6d49f810b75cec4038488603368bc6c

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
