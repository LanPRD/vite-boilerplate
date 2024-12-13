export async function axeAccessibilityReporter() {
  if (import.meta.env.MODE === "development" && typeof window !== "undefined") {
    const axe = await import("@axe-core/react").then(mod => mod.default);
    const React = await import("react").then(mod => mod.default);
    const ReactDOM = await import("react-dom").then(mod => mod.default);

    const timeout = 1000;
    axe(React, ReactDOM, timeout);
  }
}
