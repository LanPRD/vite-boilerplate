import { createContext, useContext } from "react";

interface AppContextProps {
  value: boolean;
}

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

function AppProvider({ children }: AppProviderProps) {
  return <AppContext.Provider value={{ value: true }}>{children}</AppContext.Provider>;
}

function useApp(): AppContextProps {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Missing AppProvider");
  }

  return context;
}

export { AppProvider, useApp };
