import ReactConfig from "@prdev-solutions/eslint-config/react.mjs";

export default [
  ...ReactConfig,
  {
    files: ["scripts/**"],
    rules: {
      "@typescript-eslint/no-require-imports": ["off"]
    }
  },
  { complexity: ["error", 7] }
];
