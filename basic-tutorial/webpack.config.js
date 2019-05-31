const webpack = require('webpack');
const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				exclude: /node_modules/,

				//loader: 'babel-loader',
				use: ['babel-loader', 'eslint-loader'],

				/*options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},*/
			},
			{
				test: /\.(png|svg|jpg|gif|ico)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(scss|css)$/,

				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			}
		]
	},

	entry: './src/index.js',

	output: {
		// chunkFilename: '[name].[chunkhash].js',
		// filename: '[name].[chunkhash].js',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
	},

	mode: 'development',

	devServer: {
		contentBase: './public',
		index: 'index.html',
		port: 9000,
	},

	devtool: 'inline-source-map',

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};
