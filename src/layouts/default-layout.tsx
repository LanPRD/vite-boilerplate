import { axeAccessibilityReporter } from "@/lib/axe-accessibility";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export function DefaultLayout() {
  const location = useLocation();

  useEffect(() => {
    axeAccessibilityReporter();
  }, [location.pathname]);

  return <Outlet />;
}
