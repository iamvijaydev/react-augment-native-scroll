import path from 'path'
import webpack from 'webpack'

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/'),
        publicPath: '/examples/build/'
    },
    devtool: 'inline-source-map',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
    }
};