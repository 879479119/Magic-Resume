const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// let devConfig = require('./config/webpack.dev.config')

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
				test: /\.(gif|svg|png|webp|jpg|jpeg)$/,
				loader: ['url-loader','image-loader']
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
			filename: "style.css",
			allChunks: true
		}),
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
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
	]
}

let resultConfig = commonConfig

// switch (process.env.npm_lifecycle_event){
// 	case "start":
// 		resultConfig = merge(commonConfig, devConfig)
// 		break
// 	case "build":
// 		break
// }

module.exports = resultConfig