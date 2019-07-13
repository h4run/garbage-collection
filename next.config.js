// const webpack = require("webpack");
// const { parsed: localEnv } = require("dotenv").config();
const withPlugins = require("next-compose-plugins");
const css = require("@zeit/next-css");
const fonts = require("next-fonts");

module.exports = withPlugins([css, fonts], {
  enableSvg: true,
  webpack: config => {
    config.node = {
      fs: "empty"
    };

    // config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  }
});
