import fs from 'fs'
import webpack from 'webpack'

let plugins;
if ( process.env.NODE_ENV === 'development' ) {
    plugins = [
        new webpack.HotModuleReplacementPlugin()
    ]
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
            banner: `v${require('./package.json').version}\n\n${fs.readFileSync('./LICENSE', 'utf8')}`,
            raw: false,
            entryOnly: true
        })
    ]
}

let min = process.env.NODE_ENV === 'production' ? '.min' : '';
let filename = `react-augment-native-scroll${min}.js`;

export { plugins, filename };