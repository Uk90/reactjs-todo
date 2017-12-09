var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: [path.resolve(__dirname, 'src') + '/app/index.js', path.resolve(__dirname, 'src') + '/app/sass/style.scss'],
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            { // sass / scss loader for webpack
              test: /\.(sass|scss)$/,
              loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
     new OpenBrowserPlugin({ url: 'http://localhost:1234' }),
     new ExtractTextPlugin({ // define where to save the file
       filename: 'style.css',
       allChunks: true,
     }),
   ]
};
