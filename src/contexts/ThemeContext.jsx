import { createContext, useState } from "react";

// es un componente especial de contexto de react
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const prevTheme = localStorage.getItem("ironbnb-theme");

  const [theme, setTheme] = useState(prevTheme || "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "light" ? "dark" : "light"
      localStorage.setItem("ironbnb-theme", nextTheme)

      return nextTheme
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};