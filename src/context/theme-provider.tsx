import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  toggleTheme: () => null
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function ThemeProvider({ children, defaultTheme = "system", storageKey = "ui-theme" }: ThemeProviderProps) {
  const appName = import.meta.env.VITE_APP_NAME;

  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(`@${appName}:${storageKey}`) as Theme) || defaultTheme
  );

  function toggleTheme(theme: Theme) {
    localStorage.setItem(`@${appName}:${storageKey}`, theme);
    console.log(`Changed theme to ${theme}`, storageKey);
    setTheme(theme);
  }

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return <ThemeProviderContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeProviderContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}

export { ThemeProvider, useTheme };
