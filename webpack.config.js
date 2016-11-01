var configs = module.exports = {
	entry: {
		app: [
			'babel-polyfill',
			'./src/apical.js'
		]
	},
	output: {
		libraryTarget: 'commonjs2',
		path: __dirname + '/lib',
		publicPath: '/lib',
		filename: 'apical.js'
	},
	node: {
		__dirname: false,
		__filename: true
	},
	target: 'node',
	externals: [
		'pug'
	],
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: [ 'es2015', 'es2017' ]
				}
			},
			{ test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	}
};
