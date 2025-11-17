import nextJest from "next/jest.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    "^infra/(.*)$": "<rootDir>/infra/$1",
  },
};

export default createJestConfig(customJestConfig);
