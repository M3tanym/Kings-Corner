const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const rules = require("./webpack-rules");

const outputDirectory = "dist/website";

module.exports = {
	entry: './index.js',
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
	module: rules,
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
