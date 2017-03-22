const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let devConfig = require('./webpack.dev.config')

let commonConfig = {
	entry: {
		main: "./src/index.js",
		// vendor: ""
	},
	output: {
		path: __dirname + '/dist/',
		filename: "[name].bundle.[hash].js"
	},
	devServer: {
		host: "0.0.0.0",
		port: 8888,
		inline: true,
		hot: true,
	},
	// postcss:[autoprefixer({browsers:['last 2 versions']})],
	module: {
		rules:[
		{
			test: /\.js$/,
			loader: "",
			exclude: /node_modules/
		},
		{
			test: /\.scss$/,
			loader: [ExtractTextPlugin.extract("style-loader","css-loader"),"sass-loader"]
			// loader: "style!css!sass"
		}
	]},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlPlugin({template: './template/index.ejs'}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer({browsers:['last 2 versions']})]
			}
		}),
		new ExtractTextPlugin("styles.css"),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
	]
}

let resultConfig = commonConfig

if(process.env){
	resultConfig = merge(commonConfig, devConfig)
}

module.exports = resultConfig