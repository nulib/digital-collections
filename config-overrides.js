/**
 * This file exists as part of the react-app-rewired NPM package, which we're using
 * to customize the Webpack config without ejecting from our Create React App.
 *
 * We need to process .mjs files as part of the Clover IIIF media player import (it has
 * dependencies which export as .mjs files).
 */

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });
  return config;
};
