import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "@/layouts/default-layout";

import { Home } from "@/pages/home";
import { NotFound } from "@/pages/not-found";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
