import path from 'path'
import { plugins, filename } from './webpack.props'

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: [
        'webpack-hot-middleware/client',
        './index.js'
    ],
    output: {
        filename: filename,
        path: path.resolve(__dirname, 'build/'),
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: ['react-hot-loader', 'babel-loader']
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    plugins: plugins
};