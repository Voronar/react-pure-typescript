  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: [
      // 'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './client/index.tsx',
    ],
    output: {
      filename: 'app[hash].js',
      path: path.join(__dirname, '..', 'dist'),
      publicPath: '/',
   },
   module: {
     rules: [
       {
         test: /\.tsx?$/,
         use: [
           'react-hot-loader/webpack',
           {
             loader: 'ts-loader',
             options: {},
           },
         ],
         exclude: /node_modules/,
       },
     ]
   },
   resolve: {
     extensions: [".tsx", ".ts", ".js"],
   },
   plugins: [
     new HtmlWebpackPlugin({
       template: './client/index.html',
       inject: 'body',
       filename: 'index.html',
     }),
     new webpack.optimize.OccurrenceOrderPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoEmitOnErrorsPlugin(),
   ],
};
