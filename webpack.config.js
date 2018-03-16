const Path = require('path');
const Webpack = require('webpack');
const Dotenv = require('dotenv').config({ path: Path.join(__dirname, '/.env') });
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = 'dist';
const buildPath = Path.resolve(__dirname, buildDir);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    vendor: ['react', 'react-dom'],
    app: './app/js/index.jsx',
  },
  output: {
    filename: 'js/[name].js',
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
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
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
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    contentBase: buildPath,
    port: process.env.SERVER_PORT,
    stats: 'minimal',
  },
};
