const nodecg = require('./util/nodecg-api-context').get();
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

dashJsPath = path.dirname(__dirname) + '/dashboard/';
nodeModulesPath = path.dirname(__dirname) + '/node_modules';
bowerModulesPath = path.dirname(__dirname) + '/bower_components';

webpack([
  {
    entry: dashJsPath + 'src/cta.js',
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
      path: dashJsPath + 'dist',
      filename: 'cta.bundle.js'
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
    entry: dashJsPath + 'src/obs-connection.js',
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
      path: dashJsPath + 'dist',
      filename: 'obs-connection.bundle.js'
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
    entry: dashJsPath + 'src/music-player.js',
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
      path: dashJsPath + 'dist',
      filename: 'music-player.bundle.js'
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
    entry: dashJsPath + 'src/schedule.js',
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
      path: dashJsPath + 'dist',
      filename: 'schedule.bundle.js'
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
    entry: dashJsPath + 'src/streamers.js',
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
      path: dashJsPath + 'dist',
      filename: 'streamers.bundle.js'
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
