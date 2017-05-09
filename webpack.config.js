module.exports = {

	entry: './client/index.js',
	output: {
		path: __dirname,
		filename: './public/bundle.js',
		publicPath: '/'
	},

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	devServer: {
		historyApiFallback: true
	}
}

// style loader injects styles into bundle.js
// all css files are included into bundle
