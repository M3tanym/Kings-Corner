module.exports = {

	packagerConfig: { asar: true, overwrite: true },
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: { setupExe: "kings-corner" }
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['win32', 'darwin']
		},
		{
			name: '@electron-forge/maker-dmg',
			config: { name: 'King\'s Corner' }
		},
		{
			name: '@electron-forge/maker-deb',
			config: { options: {
					genericName: "King\'s Corner",
					homepage: "kings-corner.com",
					name: 'kings-corner',
					productName: 'King\'s Corner',
					section: "games"
				}}
		},
		{
			name: '@electron-forge/maker-rpm',
			config: { options: {
					genericName: "King\'s Corner",
					homepage: "kings-corner.com",
					name: 'kings-corner',
					productName: 'King\'s Corner'
			}}
		}
	],
	publishers: [
		{
			name: '@electron-forge/publisher-github',
			config: { draft: false, repository: { owner: 'M3tanym', name: 'Kings-Corner' }}
		}
	]
}
