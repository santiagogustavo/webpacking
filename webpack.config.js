const Path = require('path');
const Webpack = require('webpack');
const Dotenv = require('dotenv').config({ path: Path.join(__dirname, '/.env') });
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = 'dist';
const buildPath = Path.resolve(__dirname, buildDir);

module.exports = {
  entry: './assets/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: buildPath,
    publicPath: `/${buildDir}/`,
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
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new Webpack.DefinePlugin({ 'process.env': Dotenv.parsed }),
  ],
  mode: process.env.NODE_ENV,
  devServer: {
    compress: true,
    contentBase: buildPath,
    port: process.env.SERVER_PORT,
    stats: 'minimal',
  },
};
