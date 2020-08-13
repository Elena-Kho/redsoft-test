let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
	entry: "./src/index.js",
	output: {
	  path: path.resolve(__dirname, "./dist"),
	  filename: "main.js",
	  //publicPath: "dist/"
    publicPath: "/redsoft-test/dist/"
	},
    devServer: {
      contentBase: path.join(__dirname, "./dist"),
      overlay: true
    },
    module: {
  		rules: [
		  	{
			    test: /\.js$/,
			    loader: "babel-loader",
			    exclude: /node_modules/
		  	},
        {
          test: /\.(s*)css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'img/',
            name: '[name].[ext]',
            publicPath: './img/'
          }
        },
  		]
    },
    plugins: [
      new MiniCssExtractPlugin({
         filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/img', to: './img' }
        ],
      }),
    ]
};

module.exports = (env, options) => {
	let production = options.mode === "production";
	config.devtool = production ? false : "eval-sourcemap";

	return config;
}
