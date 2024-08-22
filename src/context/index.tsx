import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

interface AppContextProps {
  children: React.ReactNode;
}

export function AppContext({ children }: AppContextProps) {
  const helmetContext = {};

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider>{children}</ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
