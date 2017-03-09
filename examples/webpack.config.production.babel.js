import path from 'path'
import webpack from 'webpack'

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/'),
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false
        })
    ]
};