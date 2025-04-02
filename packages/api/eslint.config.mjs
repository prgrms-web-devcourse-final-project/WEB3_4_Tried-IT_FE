import eslintConfig from "../eslint-config/index.mjs";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...eslintConfig,
  {
    ignores: ["dist/**/*"],
  },
];
