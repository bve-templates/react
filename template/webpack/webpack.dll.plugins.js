/**
 * 引入dll需要的插件
 * 1. DllReferencePlugin引入dll.config生成的manifest
 * 2. HtmlWebpackIncludeAssetsPlugin在html中插入对应的js
 * 
 */
const resolve = require('path').resolve
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const webpack = require('webpack')
const manifest = require(resolve('dist', 'dll.manifest.json'))

module.exports = context => ([
	/**
	 * 生成多个DllReferencePlugin
	 * 这里数量取决与 ./webpack.dll.config.js 的 entry数量
	 */
	...Object.keys(manifest).map(key => new webpack.DllReferencePlugin({
		context,
		manifest: require(resolve(`dist/${key.replace(/\.js$/g, '')}.manifest.json`))
	})),
	// 在html增加dll的script标签
	new HtmlWebpackIncludeAssetsPlugin({
		assets: Object.values(manifest),
		append: false,
	})
])