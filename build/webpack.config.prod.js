const webpack = require('webpack')
const { baseConfig, smart } = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const outConfig = smart(baseConfig, {
  devtool: 'source-map',
  output: {
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: false // 开启热重载
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: ['ie > 8', 'last 2 version', 'safari >= 9']
                  }),
                  require('cssnano')
                ]
              }
            }
          ],
          fallback: ['vue-style-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: ['ie > 8', 'last 2 version', 'safari >= 9']
                  }),
                  require('cssnano')
                ]
              }
            },
            'sass-loader'
          ],
          fallback: ['vue-style-loader']
        })
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin({ filename: '[name].min.css', allChunks: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        comments: function (n, c) {
          /*! IMPORTANT: Please preserve 3rd-party library license info */
          var text = c.value; var type = c.type
          if (type === 'comment2') {
            return /^!|@preserve|@license|@cc_on|MIT/i.test(text)
          }
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
})

module.exports = outConfig
