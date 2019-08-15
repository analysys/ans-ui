const path = require('path')
const glob = require('globby')

const isProduction = process.env.NODE_ENV !== 'development'
const componentName = process.env.COMPONENT_NAME
const resolve = dir => path.join(__dirname, `../../packages/${componentName}`, dir)
const assetsDir = resolve('src')
const distDir = resolve('dist')

const baseConfig = {
  entry: {
    index: glob.sync(['index.js'], { cwd: assetsDir })
  },
  output: {
    path: distDir
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheIdentifier: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      assetsDir,
      'node_modules'
    ],
    extensions: ['.js', '.json', '.vue', '.scss']
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
    'popper.js': {
      commonjs: 'popper.js',
      commonjs2: 'popper.js',
      amd: 'popper.js',
      root: 'Popper'
    }
  }
}

module.exports = {
  isProduction,
  assetsDir,
  distDir,
  baseConfig
}
