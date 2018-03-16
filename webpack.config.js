const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '/.env') });

module.exports = {
  entry: './assets/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(js | jsx)$/,
        exclude: /(node_modules | dist)/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules | dist)/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': dotenv.parsed }),
  ],
  mode: process.env.NODE_ENV,
  devServer: {
    compress: true,
    port: process.env.SERVER_PORT,
  },
};
