const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const nodecg = require('./util/nodecg-api-context').get();

const dashJsPath = `${path.dirname(__dirname)}/dashboard/`;
const nodeModulesPath = `${path.dirname(__dirname)}/node_modules`;
const bowerModulesPath = `${path.dirname(__dirname)}/node_modules/@bower_components`;

module.exports = [
  {
    entry: `${dashJsPath}src/cta.js`,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    output: {
      path: `${dashJsPath}dist`,
      filename: 'cta.bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${dashJsPath}src/dashboard.ejs`,
        filename: `${dashJsPath}cta.html`,
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    resolveLoader: {
      modules: [nodeModulesPath, bowerModulesPath],
    },
  },
  {
    entry: `${dashJsPath}src/donations.js`,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    output: {
      path: `${dashJsPath}dist`,
      filename: 'donations.bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${dashJsPath}src/dashboard.ejs`,
        filename: `${dashJsPath}donations.html`,
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    resolveLoader: {
      modules: [nodeModulesPath, bowerModulesPath],
    },
  },
  {
    entry: `${dashJsPath}src/logo-selector.js`,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    output: {
      path: `${dashJsPath}dist`,
      filename: 'logo-selector.bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${dashJsPath}src/dashboard.ejs`,
        filename: `${dashJsPath}logo-selector.html`,
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    resolveLoader: {
      modules: [nodeModulesPath, bowerModulesPath],
    },
  },
  {
    entry: `${dashJsPath}src/music-player.js`,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    output: {
      path: `${dashJsPath}dist`,
      filename: 'music-player.bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${dashJsPath}src/dashboard.ejs`,
        filename: `${dashJsPath}music-player.html`,
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    resolveLoader: {
      modules: [nodeModulesPath, bowerModulesPath],
    },
  },
  {
    entry: `${dashJsPath}src/schedule.js`,
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    output: {
      path: `${dashJsPath}dist`,
      filename: 'schedule.bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${dashJsPath}src/dashboard.ejs`,
        filename: `${dashJsPath}schedule.html`,
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    resolveLoader: {
      modules: [nodeModulesPath, bowerModulesPath],
    },
  },
  // {
  //   entry: dashJsPath + 'src/streamers.js',
  //   mode: "development",
  //   module: {
  //     rules: [
  //       {
  //         test: /\.css$/,
  //         use: [
  //           'style-loader',
  //           'css-loader'
  //         ]
  //       },
  //       {
  //         test: /\.vue$/,
  //         loader: 'vue-loader'
  //       },
  //       {
  //         test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
  //         loader: 'url-loader?limit=100000'
  //       }
  //     ]
  //   },
  //   output: {
  //     path: dashJsPath + 'dist',
  //     filename: 'streamers.bundle.js'
  //   },
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       template: dashJsPath + 'src/dashboard.ejs',
  //       filename: dashJsPath + 'streamers.html'
  //     }),
  //     new VueLoaderPlugin()
  //   ],
  //   resolve: {
  //     extensions: ['.js', '.vue', '.json'],
  //     alias: {
  //       'vue$': 'vue/dist/vue.esm.js'
  //     }
  //   },
  //   resolveLoader: {
  //     modules: [ nodeModulesPath, bowerModulesPath ]
  //   }
  // }
];
