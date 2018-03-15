const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  entry: './assets/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules | dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-es2017']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env": dotenv.parsed }),
  ],
  mode: process.env.NODE_ENV,
  devServer: {
    compress: true,
    port: process.env.SERVER_PORT
  }
}