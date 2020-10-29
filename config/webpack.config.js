/* eslint camelcase:0 */
require('dotenv').config({ silent: true });
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

process.env.BROWSERSLIST_CONFIG = 'browserslist';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: [
    'babel-polyfill',
    path.join(rootPath, 'src/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name]-[hash].js',
    publicPath: isProduction ? './' : '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader!postcss-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(eot|ttf|woff2|woff)$/,
        loader: 'url-loader?prefix=fonts/&context=/src/fonts'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?prefix=image/&limit=5000&context=/src/images'
      }
    ]
  },

  resolve: {
    root: [
      path.join(rootPath, 'src')
    ],
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },

  resolveLoader: {
    root: path.join(rootPath, 'node_modules')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
      GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BASEMAP_TILE_URL: JSON.stringify(process.env.BASEMAP_TILE_URL),
        BASEMAP_LABEL_URL: JSON.stringify(process.env.BASEMAP_LABEL_URL),
        GOOGLE_PLACES_API_KEY: JSON.stringify(process.env.GOOGLE_PLACES_API_KEY),
        GOOGLE_ANALYTICS: JSON.stringify(process.env.GOOGLE_ANALYTICS)
      },
      config: {
        API_URL: JSON.stringify(process.env.API_URL),
        BITLY_LOGIN: JSON.stringify(process.env.BITLY_LOGIN),
        BITLY_KEY: JSON.stringify(process.env.BITLY_KEY)
      }
    })
  ]

};

// Environment configuration
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin());
  // config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //     dead_code: true,
  //     drop_debugger: true,
  //     drop_console: true
  //   },
  //   comments: false
  // }));
} else {
  config.devtool = 'eval-source-map';
}

module.exports = config;
