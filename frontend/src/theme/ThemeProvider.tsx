import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemeForSection } from '../theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(getThemeForSection('home'));

  useEffect(() => {
    // Update theme when route changes
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const section = path.substring(1) || 'home'; // Get section from URL path
      setCurrentTheme(getThemeForSection(section));
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Initial theme update
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
