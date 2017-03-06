import path from 'path'
import plugins from './webpack.props'

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/'),
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    },
    stats: 'verbose',
    devServer: {
        contentBase: path.join(__dirname, '../'),
        publicPath: '/examples/build/',
        hot: true,
        inline: true,
        compress: true,
        port: 3000,
        historyApiFallback: true
    },
    plugins: plugins
};