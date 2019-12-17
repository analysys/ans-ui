const path = require('path')
const { smart } = require('webpack-merge')

const resolve = dir => path.resolve(__dirname, '..', dir)

const baseConfig = {
  entry: {
    'ans-ui': './src/index.js'
  },
  output: {
    path: resolve('lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ans',
    umdNamedDefine: true
  },
  performance: {
    hints: 'warning'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheIdentifier: true
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      '@': resolve('src'),
      packages: resolve('packages')
    },
    extensions: ['.js', '.json', '.vue', '.scss']
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  plugins: []
}

module.exports = {
  baseConfig,
  resolve,
  smart
}
