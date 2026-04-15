import { createContext } from "react";

/**
 * Provides a way to manage theme state
 */
export const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {},
    primaryColor: '#1677ff',
    setPrimaryColor: (_color: string) => {}
});