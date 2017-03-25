/**
 * webpack基础配置文件
*/

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';

export default (env) => ({
  context: __dirname,

  entry: {
    app: './src/app.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css/,
      use: ExtractTextWebpackPlugin.extract({
        use: 'css-loader?modules&localIdentName=[name]__[local]--[hash:base64:5]'
      })
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
    }),

    new ExtractTextWebpackPlugin('style.css')
  ]
});
