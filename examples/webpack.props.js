import fs from 'fs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
let plugins, filename;

if ( process.env.NODE_ENV === 'development' ) {
    plugins = [
        new webpack.HotModuleReplacementPlugin()
    ]
    filename = 'bundle.js'
} else if ( process.env.NODE_ENV === 'production' ) {
    plugins = [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.BannerPlugin({
            banner: `v${require('../package.json').version}\n\n${fs.readFileSync('./LICENSE', 'utf8')}`,
            raw: false,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template: '../template.ejs',
            filename: '../../index.html'
        })
    ]
    filename = 'bundle.[hash].js'
}

export { plugins, filename };