/**
 * webpack 开发配置文件
*/

import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.base';

export default (env) =>
  WebpackMerge(baseConfig(env), {
    output: {
      filename: '[name].js',
      publicPath: '/'
    },

    devtool: 'eval-source-map',

    devServer: {
      inline: true
    },

    module: {
      rules: [{
        test: /\.css/,
        use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:4]'
        })
      }]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      new ExtractTextWebpackPlugin('assets/styles/all.css'),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ]
  });
