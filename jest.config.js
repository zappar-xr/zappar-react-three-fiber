/* eslint-disable max-len */
module.exports = {
  roots: ["<rootDir>/tests/"],
  modulePathIgnorePatterns: ["<rootDir>/tests/jest", "<rootDir>/tests/manual", "<rootDir>/tests/declarations.d.ts", "<rootDir>/tests/.eslintrc"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: [],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  preset: "jest-puppeteer",
};
