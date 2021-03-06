const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const devConfig = require('./config/webpack.dev.config')
const prodConfig = require('./config/webpack.prod.config')

let commonConfig = {
	entry: {
		main: "./src/index.js",
	},
	output: {
		path: __dirname + '/dist/',
		filename: "[name].bundle.[hash].js"
	},
	module: {
		rules:[
			{
				test: /\.ejs$/,
				loader: 'ejs-compiled-loader'
			},
			{
				test: /\.(gif|svg|png|webp|jpg|jpeg)$/,
				loader: ['url-loader?limit=8000','image-loader']
			},
			{
				test: /\.(toff|woff|ttf)$/,
				loader: ['url-loader']
			},
			{
				test: /\.(scss|css|sass)$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader','postcss-loader','sass-loader']
				})
			},
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "main.css",
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HtmlPlugin({template: './template/index.ejs'}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer({browsers:['last 2 versions']})]
			}
		})
	]
}

let resultConfig = commonConfig

switch (process.env.npm_lifecycle_event){
	case "start":
		resultConfig = merge(commonConfig, devConfig)
		break
	case "build":
		resultConfig = merge(commonConfig, prodConfig)
		break
}

module.exports = resultConfig