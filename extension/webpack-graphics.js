const nodecg = require('./util/nodecg-api-context').get();
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const bowerModulesPath = path.dirname(__dirname) + '/bower_components';
const gfxJsPath = path.dirname(__dirname) + '/graphics/';
const nodeModulesPath = path.dirname(__dirname) + '/node_modules';

webpack([
  {
    entry: gfxJsPath + 'src/sidebar.js',
    mode: "development",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    output: {
      path: gfxJsPath + 'dist',
      filename: 'sidebar.bundle.js'
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    resolveLoader: {
      modules: [ nodeModulesPath, bowerModulesPath ]
    }
  },
  {
    entry: gfxJsPath + 'src/lowerbar.js',
    mode: "development",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    output: {
      path: gfxJsPath + 'dist',
      filename: 'lowerbar.bundle.js'
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    resolveLoader: {
      modules: [ nodeModulesPath, bowerModulesPath ]
    }
  }
], (err, stats) => {
  if (err || stats.hasErrors()) {
    nodecg.log.error(stats);
    return
  }
    nodecg.log.debug(stats);
});
