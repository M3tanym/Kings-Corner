const path = require("path");
const { spawn } = require('child_process');

const webpackConfig = require("./webpack.website.config");

webpackConfig.devServer.open = false;
webpackConfig.devServer.watchOptions = { ignored: [path.resolve(__dirname, '../main.js')] };
webpackConfig.devServer.before = ()  => {
	spawn('electron', ['.'], { shell: true, env: process.env, stdio: 'inherit' })
		.on('close', code => process.exit(code))
		.on('error', spawnError => console.error(spawnError))
}
webpackConfig.target = 'electron-renderer';

module.exports = webpackConfig;