import { Route, Routes } from "react-router";

import { DefaultLayout } from "@/layouts/default-layout";

import { Home } from "@/pages/home";
import { NotFound } from "@/pages/not-found";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
