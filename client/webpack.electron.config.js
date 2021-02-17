const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');
const rules = require("./webpack-rules");

const output = 'dist/electron'

module.exports = {
	entry: './index.js',
	devServer: {
		contentBase: path.resolve(__dirname, output),
		port: 3000, open: false, hot: true, historyApiFallback: {
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
		proxy: { "/graphql": "http://localhost:8000" },
		stats: { colors: true, chunks: false, children: false},
		before() {
			spawn('electron', ['.'], { shell: true, env: process.env, stdio: 'inherit' })
				.on('close', code => process.exit(code))
				.on('error', spawnError => console.error(spawnError))
		}
	},
	devtool: 'eval-source-map',
	module: rules,
	output: { filename: 'bundle.js', path: path.resolve(__dirname, output) },
	plugins: [
		new HtmlWebpackPlugin({template: './static/template/index.html', title: 'Kings Corner'}),
		new webpack.HotModuleReplacementPlugin(),
	],
	target: 'electron-renderer',
};
