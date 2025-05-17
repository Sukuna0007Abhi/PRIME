import { ReactNode } from 'react';

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export declare const ThemeProvider: ({ children }: { children: ReactNode }) => JSX.Element;
export declare const useTheme: () => ThemeContextType;
