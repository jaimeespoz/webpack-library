const { resolve } = require('path');

const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin');

module.exports = {
  entry: {
    one: './entry-one.js',
    two: './entry-two.js',
  },
  // infrastructureLogging: {
  //   debug: true,
  //   level: 'verbose',
  // },
  mode: 'production',
  output: {
    filename: '[name]-[contenthash].js',
    path: resolve(__dirname, 'out'),
  },
  plugins: [
    new BytenodeWebpackPlugin(),
  ],
  // stats: {
  //   logging: 'verbose',
  //   loggingDebug: true,
  // },
  target: 'node14',
};
