/**
 * webpack 开发配置文件
*/

import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import baseConfig from './webpack.base';

export default (env) => {
  return WebpackMerge(baseConfig(env), {
    devtool: 'eval-source-map',

    devServer: {
      inline: true,
      hot: true
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ]
  });
};
