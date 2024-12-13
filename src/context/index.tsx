import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

interface AppContextProps {
  children: React.ReactNode;
}

export function AppContext({ children }: AppContextProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
