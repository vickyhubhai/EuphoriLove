"use client";
import { createContext, useContext, useEffect } from 'react';

// Create a context for theme management
export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  useEffect(() => {
    // Always apply dark mode
    document.documentElement.classList.add('dark');
  }, []);

  // Provide the theme context to children components
  return (
    <ThemeContext.Provider value={{ isDarkMode: true, toggleDarkMode: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}