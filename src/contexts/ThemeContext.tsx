
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If stored theme exists, use it
    if (savedTheme) {
      return savedTheme as Theme;
    }
    
    // Otherwise, check for user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  });

  useEffect(() => {
    // Update localStorage
    localStorage.setItem('theme', theme);
    
    // Update document class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      
      // Black and Purple theme
      document.documentElement.style.setProperty('--background', '0 0% 0%'); // Pure black
      document.documentElement.style.setProperty('--foreground', '270 100% 95%'); // Light purple
      document.documentElement.style.setProperty('--card', '0 0% 3%'); // Very dark gray for cards
      document.documentElement.style.setProperty('--card-foreground', '270 100% 95%'); // Light purple
      document.documentElement.style.setProperty('--popover', '0 0% 0%'); // Pure black
      document.documentElement.style.setProperty('--popover-foreground', '270 100% 95%'); // Light purple
      document.documentElement.style.setProperty('--primary', '270 100% 70%'); // Vibrant purple
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 0%'); // Black
      document.documentElement.style.setProperty('--secondary', '0 0% 5%'); // Very dark gray
      document.documentElement.style.setProperty('--secondary-foreground', '270 100% 95%'); // Light purple
      document.documentElement.style.setProperty('--muted', '0 0% 10%'); // Dark gray
      document.documentElement.style.setProperty('--muted-foreground', '270 100% 75%'); // Slightly muted purple
      document.documentElement.style.setProperty('--accent', '270 100% 60%'); // Deeper purple
      document.documentElement.style.setProperty('--accent-foreground', '0 0% 0%'); // Black
      document.documentElement.style.setProperty('--border', '270 30% 20%'); // Dark purple
      document.documentElement.style.setProperty('--input', '0 0% 5%'); // Very dark gray
      document.documentElement.style.setProperty('--ring', '270 100% 70%'); // Vibrant purple
    } else {
      document.documentElement.classList.remove('dark');
      
      // Update light theme to black and white
      document.documentElement.style.setProperty('--background', '0 0% 100%'); // Pure white
      document.documentElement.style.setProperty('--foreground', '0 0% 0%'); // Pure black
      document.documentElement.style.setProperty('--card', '0 0% 100%');
      document.documentElement.style.setProperty('--card-foreground', '0 0% 0%');
      document.documentElement.style.setProperty('--popover', '0 0% 100%');
      document.documentElement.style.setProperty('--popover-foreground', '0 0% 0%');
      document.documentElement.style.setProperty('--primary', '19 29% 28%'); // Black
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%'); // White
      document.documentElement.style.setProperty('--secondary', '0 0% 95%'); // Light gray
      document.documentElement.style.setProperty('--secondary-foreground', '0 0% 0%');
      document.documentElement.style.setProperty('--muted', '0 0% 90%');
      document.documentElement.style.setProperty('--muted-foreground', '0 0% 40%');
      document.documentElement.style.setProperty('--accent', '0 0% 95%'); 
      document.documentElement.style.setProperty('--accent-foreground', '0 0% 0%');
      document.documentElement.style.setProperty('--border', '0 0% 80%');
      document.documentElement.style.setProperty('--input', '0 0% 90%');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
