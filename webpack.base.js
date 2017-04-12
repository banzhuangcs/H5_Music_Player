/**
 * webpack基础配置文件
*/

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (env) => ({
  entry: {
    app: path.join(__dirname, 'src', 'app.js'),
    vender: ['react', 'react-dom', 'redux', 'react-redux', 'react-router']
  },

  output: {
    path: path.resolve('dist')
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(ttf|woff|eot|svg)/,
      use: 'file-loader?name=assets/fonts/[hash].[ext]'
    }, {
      test: /\.jpg/,
      use: 'url-loader?limit=8192&name=assets/images/[hash].[ext]'
    }, {
      test: /\.json/,
      use: 'json-loader',
      exclude: /node_modules/
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ names: ['vender', 'runtime'] }),

    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'HTML5简单音乐播放器'
    })
  ]
});
