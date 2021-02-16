const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
	entry: ["@babel/polyfill", "./index.js"],
	devServer: {
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: {
			rewrites: [
				{
				  from: /^\/.+\..+$/,
				  to: function(context) {
				  	let f = context.parsedUrl.pathname.split('/');
					return '/' + f[f.length - 1];
				  }
				}
		  	]
		},
		proxy: { "/graphql": "http://localhost:8000" }
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {presets: ['@babel/preset-env', '@babel/react']}
			},
			{test: /\.css$/i, use: ['style-loader', 'css-loader']},
			{
				test: /\.s[ac]ss$/i, use:
					[
						{loader: 'style-loader'},
						{loader: 'css-loader'},
						{loader: 'postcss-loader', options: {postcssOptions: {plugins: ['autoprefixer', 'precss']}}},
						{loader: 'sass-loader'}
					]
			},
			{test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpe?g|gif|mp4|wav|mp3)$/i, loader: 'file-loader'}
		]
	},
	output: { filename: "bundle.js", path: path.join(__dirname, outputDirectory) },
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./static/template/index.html",
			favicon: "./static/template/favicon.ico",
			title: 'Kings Corner'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
};
