module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "sort-keys-fix"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    //     indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": 0,
    //     "no-unused-vars": [
    //       "error",
    //       { args: "all", ignoreRestSiblings: false, vars: "all" },
    //     ],
    "no-unused-vars": "off",
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": 0,
    semi: ["error", "always"],
    "sort-keys": [1, "asc"],
    "sort-keys-fix/sort-keys-fix": "warn",
  },
};
