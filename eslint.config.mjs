import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import pluginJest from "eslint-plugin-jest";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
