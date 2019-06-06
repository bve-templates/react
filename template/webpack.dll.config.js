/**
 * 生成webpack dll
 * 用来优化速度
 */
const webpack = require('webpack')
const resolve = require('path').resolve
const ManifestPlugin = require('webpack-manifest-plugin')
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    // 这里是不需要经常编译的包
    vendor: ['react', 'react-router-dom', 'react-dom']
  },
  output: {
    path: resolve('dist'),
    filename: '[name].[chunkhash:5].dll.js',
    library: '[name]_[chunkhash:10]',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // 生成dll文件
    new webpack.DllPlugin({
      path: resolve('dist', '[name].manifest.json'),
      name: '[name]_[chunkhash:10]',
      context: __dirname,
    }),
    // 生成manifest文，这里主要是为了让html中引入
    new ManifestPlugin({
      fileName: resolve('dist', 'dll.manifest.json'),
    }),
  ],
}
