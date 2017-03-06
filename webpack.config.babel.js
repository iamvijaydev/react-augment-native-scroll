import path from 'path'
import { plugins, filename } from './webpack.props'

module.exports = {
    entry: './src/index.js',
    output: {
        filename: filename,
        path: path.resolve(__dirname, 'dist'),
        library: 'react-augment-native-scroll',
        libraryTarget: 'umd'
    },
    target: 'node',
    externals: 'react',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: '/dist/',
        hot: true,
        inline: true,
        compress: true,
        port: 3000,
        historyApiFallback: true
    },
    plugins: plugins
};