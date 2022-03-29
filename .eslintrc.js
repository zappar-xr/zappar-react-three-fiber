module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "eslint-plugin-tsdoc"],
  rules: {
    indent: "off",
    "eol-last": 0,
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "no-use-before-define": [0],
    "@typescript-eslint/no-use-before-define": [1],
    "no-shadow": [0],
    "no-multi-assign": [0],
    "class-methods-use-this": [0],
    "react/jsx-props-no-spreading": [0],
    "react/require-default-props": [0],
    "import/extensions": [0],
    "no-underscore-dangle": [0],
    "max-len": [
      "error",
      {
        code: 155,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth":155
      }
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
};
