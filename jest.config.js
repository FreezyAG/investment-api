import("jest-config");
export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended" ],
  testMatch: [
    "<rootDir>/spec/unit/**/*.test.js",
    "<rootDir>/spec/api/**/*.test.js",
  ],
};