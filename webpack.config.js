
module.exports = {
	entry: './index.js',
  
	output: {
	  filename: 'bundleGraph.js'
	},
	optimization: {
	  minimize: true
	},
	module: {
	  rules: [{
		test: /\.m?js$/,
		exclude: /(node_modules|bower_components)/
	  }]
	}
  };