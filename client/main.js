const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url');
const cp = require('child_process');
const os = require('os');

if (require('electron-squirrel-startup')) return app.quit();

let handleSquirrelEvent = () =>
{
	if (process.platform !== 'win32') { return false; }

	let target = path.basename(process.execPath);

	const executeSquirrelCommand = (args, done) =>
	{
		let updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
		let child = cp.spawn(updateDotExe, args, { detached: true });

		child.on('close', () => done());
	};

	const install = (done) =>
	{
		executeSquirrelCommand(['--createShortcut', target], done);
	};

	const uninstall = (done) =>
	{
		executeSquirrelCommand(['--removeShortcut', target], done);
	};

	let squirrelEvent = process.argv[1];

	switch (squirrelEvent)
	{
		case '--squirrel-install':
			install(app.quit);
			return true;

		case '--squirrel-updated':
			install(app.quit);
			return true;

		case '--squirrel-obsolete':
			app.quit();
			return true;

		case '--squirrel-uninstall':
			uninstall(app.quit);
			return true;
	}

	return false;
};

if (handleSquirrelEvent())
{
	return;
}

else if (os.platform() !== "darwin")
{
	require('update-electron-app')(
		{
			repo: 'M3tanym/Kings-Corner'
		}
	)
}

let mainWindow;
let dev = false;

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath))
{
	dev = true;
}

function createWindow() {

	mainWindow = new BrowserWindow({
		width: 1400, height: 850,
		center: true,
		icon: path.join(__dirname, './src/template/icon.png'),
		webPreferences: { nodeIntegration: true }}
	);

	let indexPath;

	if (dev && process.argv.indexOf('--noDevServer') === -1)
	{
		indexPath = url.format({protocol: 'http:', host: 'localhost:3000', pathname: '/login', slashes: true})
	}

	else
	{
		indexPath = url.format({protocol: 'file:', pathname: path.join(__dirname, 'dist/electron', 'index.html'), slashes: true})
	}

	mainWindow.loadURL(indexPath);
	mainWindow.setMenuBarVisibility(false);
	mainWindow.once('ready-to-show', () => mainWindow.show());
	mainWindow.on('closed', () => { mainWindow = null; });
}

app.on('ready', async () => createWindow());

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() }});
app.on('activate', () => { if (mainWindow === null) { createWindow() }});
