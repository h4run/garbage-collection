const withPlugins = require("next-compose-plugins");
const css = require("@zeit/next-css");
const fonts = require("next-fonts");

module.exports = withPlugins([css, fonts], {
  enableSvg: true,
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
  },
  webpack: config => {
    config.node = {
      fs: "empty"
    };

    return config;
  }
});
