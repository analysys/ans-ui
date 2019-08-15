const webpack = require('webpack')
const { baseConfig, smart } = require('./config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const outConfig = smart(baseConfig, {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }
            ],
            scss: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          postLoaders: {
            html: 'babel-loader?sourceMap'
          },
          sourceMap: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          sourceMap: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
})

delete outConfig.externals

module.exports = outConfig
