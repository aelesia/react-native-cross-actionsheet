module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "prettier/prettier": "warn",
    "no-console":["warn", { allow: ["warn", "error"] }],
    "semi": "off", // Handled by prettierrc.js
    "comma-dangle": "off", // Handled by prettierrc.js
    "react-native/no-inline-styles": "off",
    "@typescript-eslint/no-unused-vars":["warn", { "argsIgnorePattern": "^_" }]
  }
};
