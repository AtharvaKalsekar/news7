module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@common": "./common",
            "@components": "./components",
            "@models": "./models",
            "@modules": "./modules",
            "@hooks": "./hooks",
            "@screens": "./screens",
            "@services": "./services",
            "@store": "./store",
          },
        },
      ],
    ],
  };
};
