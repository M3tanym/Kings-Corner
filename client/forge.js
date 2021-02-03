module.exports = {

	packagerConfig: { asar: true, overwrite: true },
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: { name: 'xgame' }
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['win32', 'darwin']
		},
		{
			name: '@electron-forge/maker-dmg',
			config: { name: 'xgame' }
		},
		{
			name: '@electron-forge/maker-deb',
			config: { options: { name: 'xgame', productName: 'xgame'  } }
		},
		{
			name: '@electron-forge/maker-rpm',
			config: { options: { name: 'xgame', productName: 'xgame' } }
		}
	],
	publishers: [
		{
			name: '@electron-forge/publisher-github',
			config: { draft: false, repository: { owner: 'M3tanym', name: 'Kings-Corner' }}
		}
	]
}
