import { createContext, use } from "react";

interface AppContextProps {
  value: boolean;
}

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

function AppProvider({ children }: AppProviderProps) {
  return <AppContext value={{ value: true }}>{children}</AppContext>;
}

function useApp(): AppContextProps {
  const context = use(AppContext);

  if (!context) {
    throw new Error("Missing AppProvider");
  }

  return context;
}

export { AppProvider, useApp };
