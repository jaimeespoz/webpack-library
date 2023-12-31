var path = require('path');

module.exports = {
  // If your entry-point is at "src/index.js" and
  // your output is in "/dist", you can omit
  // these parts of the config
  module: {
    rules: [{
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        // This is what you need in your own work
        // loader: "elm-webpack-loader",
        loader: '../index.js'
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "src"),
    stats: 'errors-only'
  },

};
