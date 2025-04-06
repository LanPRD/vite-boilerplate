/* eslint-disable react-refresh/only-export-components */
import { createContext, use } from "react";

interface AppContextProps {
  value: boolean;
}

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider({ children }: AppProviderProps) {
  return <AppContext value={{ value: true }}>{children}</AppContext>;
}

export function useApp(): AppContextProps {
  const context = use(AppContext);

  if (!context) {
    throw new Error("Missing AppProvider");
  }

  return context;
}
