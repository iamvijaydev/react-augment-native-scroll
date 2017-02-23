const fs = require('fs')
const webpack = require('webpack')

let plugins = [];

if ( process.env.NODE_ENV === 'development' ) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
} else if ( process.env.NODE_ENV === 'production' ) {
    plugins.push (
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
        })
    )
}
plugins.push(
    new webpack.BannerPlugin({
        banner: `v${require('./package.json').version}\n\n${fs.readFileSync('./LICENSE', 'utf8')}`,
        raw: false,
        entryOnly: true
    })
)

let min = process.env.NODE_ENV === 'production' ? '.min' : '';
let fileName = `react-augment-native-scroll${min}.js`;

export default { plugins, fileName }