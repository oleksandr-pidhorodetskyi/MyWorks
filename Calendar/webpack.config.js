const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
      },
    module: {
        rules: [{
            test:/\.(s*)css$/,
            use: [
               miniCss.loader,
               'css-loader',
               'sass-loader',
            ]
         }]
    },
    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
        new HTMLWebpackPlugin({
            template: "index.html",
        })
    ],
    optimization: {
        minimize: true,
    }
};