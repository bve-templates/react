const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css抽成单个文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 设置模块如何被解析
const resolveConfig = require('./webpack/webpack.resolve')
// dll所用插件
const getDllPlugins = require('./webpack/webpack.dll.plugins')
// 开发环境
const modeDev = process.env.NODE_ENV === 'development'
/**
 * 合并基础配置与环境配置
 */

module.exports = merge(
  // 公共配置
  {
    entry: {
      index: path.resolve('src/index.js'),
    },
    output: {
      path: path.resolve('dist'),
    },
    module: {
      rules: [
        // 样式处理规则
        {
          {{#if_eq csscompiler 'Sass'}}
          test: /\.scss$/,
          {{/if_eq}}
          {{#if_eq csscompiler 'Less'}}
          test: /\.less$/,
          {{/if_eq}}
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: modeDev,
                reloadAll: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
            {{#if_eq csscompiler 'Sass'}}
            'sass-loader',
            {{/if_eq}}
            {{#if_eq csscompiler 'Less'}}
            'less-loader',
            {{/if_eq}}
          ],
        },
        // js处理规则
        {
          test: /\.js(x)*$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        // HTML处理
        {
          test: /\.(html)$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src'],
                removeComments: true, // 清除HTML注释
                collapseWhitespace: true, // 压缩HTML
                collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked='true'/> ==> <input />
                removeEmptyAttributes: true, // 删除所有空格作属性值 <input id='' /> ==> <input />
                removeScriptTypeAttributes: true, // 删除<script>的type='text/javascript'
                removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type='text/css'
                minifyJS: true, // 压缩页面JS
                minifyCSS: true, // 压缩页面CSS
              },
            },
          ],
        },
      ],
    },
    // 解析配置
    resolve: resolveConfig,
    plugins: [
      // 处理HTML
      new HtmlWebpackPlugin({
        hash: false,
        // 处理webpack.dll.config生成的html，而不是src的，因为dll加入了对dll.js的引用
        template: path.resolve('src/index.html'),
      }),
      // 设置环境变量信息
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      // 引入dll
      ...getDllPlugins(__dirname),
    ],
  },
  // 加载环境配置
  require(path.resolve('webpack', process.env.NODE_ENV))
)
