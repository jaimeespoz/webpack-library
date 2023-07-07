const path = require('path');
const IconFontPlugin = require('../../../index').Plugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: './index.js',
    },
    output: {
        path: __dirname + '/dest',
        filename: '[name].js',
        // publicPath: 'dest/',
    },
    mode: 'development',
    module: {
        rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader', require.resolve('../../../index')] }],
    },
    plugins: [
        new IconFontPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template.html'),
        }),
    ],
};
