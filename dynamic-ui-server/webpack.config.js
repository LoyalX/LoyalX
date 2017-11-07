'use strict';

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

let config = {

  entry: {

    // Auto-detect all pages in directory.

    'myApps': glob.sync('./public/**/*.js'),

  },

  module: {

    loaders: [

      // Javascript: js, jsx

      {

        test: /\.jsx?$/,

        loader: 'babel-loader'

      },

      // CSS: scss, css

      {

        test: /\.s?css$/,

        loaders: ['style', 'css', 'sass', 'postcss-loader']

      },

      // SVGs: svg, svg?something

      {

        test: /\.svg(\?.*$|$)/,

        loader: 'file-loader?name=/img/[name].[ext]'

      },

      // Images: png, gif, jpg, jpeg

      {

        test: /\.(png|gif|jpe?g)$/,

        loader: 'file?name=/img/[name].[ext]'

      },

      // HTML: htm, html

      {

        test: /\.html?$/,

        loader: "file?name=[name].[ext]"

      },

      // Font files: eot, ttf, woff, woff2

      {

        test: /\.(eot|ttf|woff2?)(\?.*$|$)/,

        loader: 'file?name=/fonts/[name].[ext]'

      }

    ]

  },

  output: {

    path: path.resolve(__dirname, 'dist'),

    filename: 'bundle--[name].js'

  },

};



module.exports = config;