const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

const output = 'dist/electron'

module.exports = {
	entry: ['@babel/polyfill', './index.js'],
	devServer: {
		contentBase: path.resolve(__dirname, output),
		port: 3000, open: false, hot: true, historyApiFallback: true, proxy: { "/api/*": "http://localhost:8000" },
		stats: { colors: true, chunks: false, children: false},
		before() {
			spawn('electron', ['.'], { shell: true, env: process.env, stdio: 'inherit' })
				.on('close', code => process.exit(code))
				.on('error', spawnError => console.error(spawnError))
		}
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
	output: { filename: 'bundle.js', path: path.resolve(__dirname, output) },
	plugins: [
		new HtmlWebpackPlugin({template: './static/template/index.html', title: 'Kings Corner'}),
		new webpack.HotModuleReplacementPlugin(),
	],
	target: 'electron-renderer',
};
