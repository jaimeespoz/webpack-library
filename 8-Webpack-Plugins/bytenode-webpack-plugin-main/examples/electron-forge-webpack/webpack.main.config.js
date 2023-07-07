const { rules } = require('./webpack.shared.rules');
const { plugins } = require('./webpack.shared.plugins');

const mainConfig = {
  entry: {
    index: './src/main.js',
  },
  module: {
    rules,
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
  },
  plugins,
  target: 'electron-main',
};

module.exports = {
  mainConfig,
};
