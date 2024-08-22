import { AppContext } from "./context";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <AppContext>
      <AppRoutes />
    </AppContext>
  );
}
