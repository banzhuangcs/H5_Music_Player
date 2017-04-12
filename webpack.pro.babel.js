import webpack from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import WebpackMerge from 'webpack-merge';
import baseConfig from './webpack.base';

export default (env) =>
  WebpackMerge(baseConfig(env), {
    output: {
      filename: '[name].[chunkhash].js'
    },

    module: {
      rules: [{
        test: /\.css/,
        use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
          publicPath: '../../'
        })
      }]
    },

    plugins: [
      new ExtractTextWebpackPlugin('assets/styles/all.css'),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
