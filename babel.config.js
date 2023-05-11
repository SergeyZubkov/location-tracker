module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        "module:react-native-dotenv",
        {
          allowUndefined: true,
          allowlist: null,
          blacklist: null,
          blocklist: null,
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          verbose: false,
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
    presets: ["babel-preset-expo"],
  };
};
