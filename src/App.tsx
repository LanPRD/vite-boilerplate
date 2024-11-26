import { BrowserRouter } from "react-router";
import { AppContext } from "./context";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <AppRoutes />
      </AppContext>
    </BrowserRouter>
  );
}
