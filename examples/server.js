require('babel-core/register');

var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config.babel');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    contentBase: path.join(__dirname, '../'),
    publicPath: '/examples/build/',
    hot: true,
    inline: true,
    compress: true,
    port: 3000,
    historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './index-dev.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});