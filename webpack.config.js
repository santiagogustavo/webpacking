const Path = require('path');
const Webpack = require('webpack');
const Dotenv = require('dotenv').config({ path: Path.join(__dirname, '/.env') });
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = 'dist';
const buildPath = Path.resolve(__dirname, buildDir);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './app/js/index.jsx',
  output: {
    filename: 'js/bundle.js',
    path: buildPath,
    publicPath: `/${buildDir}/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|dist)/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, 'app/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new Webpack.DefinePlugin({ 'process.env': JSON.stringify(Dotenv.parsed) }),
  ],
  resolve: {
    extensions: ['.html', '.js', '.jsx'],
  },
  devServer: {
    compress: true,
    contentBase: buildPath,
    port: process.env.SERVER_PORT,
    stats: 'minimal',
  },
};
