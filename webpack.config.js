var webpack = require('webpack');
var webpackNodeExternals = require('webpack-node-externals');
var path = require('path');

var version = require('./package.json').version;

var banner = "chartjs-plugin-draggable.js\n" +
             "http://chartjs.org/\n" +
             "Version: " + version + "\n\n" +
             "Copyright 2016 Jonathon Hill\n" +
             "Released under the MIT license\n" +
             "https://github.com/compwright/chartjs-plugin-draggable/blob/master/LICENSE.md";

module.exports = {
	entry: {
		'chartjs-plugin-draggable': './src/index.js',
		'chartjs-plugin-draggable.min': './src/index.js'
	},
	output: {
		path: './dist',
		filename: '[name].js'
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	externals: {
		'chart.js': 'Chart'
	},
	module: {
		loaders: [
			{
				// compile down from ES5
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin(banner),
		new webpack.ProvidePlugin({
			Chart: 'chart.js'
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true,
			compress: {
				warnings: false
			}
		})
	]
};
