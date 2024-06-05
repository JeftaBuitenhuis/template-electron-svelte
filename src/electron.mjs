import { app, shell, Menu, BrowserWindow } from 'electron';
import path from 'path';
const __dirname = import.meta.dirname;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
import * as squirrelStartup from 'electron-squirrel-startup';

if (squirrelStartup.squirrelStartup) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		simpleFullscreen: true,
		webPreferences: {
			//preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true
		}
	});

	mainWindow.maximize();

	// and load the index.html of the app.
	const mode = process.env.NODE_ENV;

	if (mode === 'production') {
		// in production, use the statically build version of our application
		mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
	} else {
		// in dev, target the host and port of the local rollup web server
		mainWindow.loadURL('http://localhost:5173');
	}

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createMenu();
	createWindow();

	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Handling the window menu creation
function createMenu() {
	const isMac = process.platform === 'darwin';

	const template = [
		// { role: 'appMenu' } (Mac only)
		...(isMac
			? [
					{
						label: app.name,
						submenu: [
							{ role: 'about' },
							{ type: 'separator' },
							{ role: 'services' },
							{ type: 'separator' },
							{ role: 'hide' },
							{ role: 'hideothers' },
							{ role: 'unhide' },
							{ type: 'separator' },
							{ role: 'quit' }
						]
					}
				]
			: []),
		// File menu
		{
			label: 'File',
			submenu: [isMac ? { role: 'close' } : { role: 'quit' }]
		},
		// Edit menu
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				...(isMac
					? [
							{ role: 'pasteAndMatchStyle' },
							{ role: 'delete' },
							{ role: 'selectAll' },
							{ type: 'separator' },
							{
								label: 'Speech',
								submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
							}
						]
					: [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
			]
		},
		// View menu
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			]
		},
		// Window menu
		{
			label: 'Window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'zoom' },
				...(isMac
					? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
					: [{ role: 'close' }])
			]
		},
		// Help menu
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn More',

					click: async () => {
						await shell.openExternal('https://jeftabuitenhuis.nl');
					}
				}
			]
		}
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}
