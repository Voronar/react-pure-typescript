/**
 * Development webpack configuration
 */
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const devConfig: webpack.Configuration = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.tsx',
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
          {
            loader: 'ts-loader',
            options: {},
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?v=\d+\.\d+\.\d+)?/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[ext]',
          },
        },
      },
      {
        test: /^((?!\.module).)*\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
            },
          },
          'resolve-url-loader',
          'postcss-loader/?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.module\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 3,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          'resolve-url-loader',
          'postcss-loader/?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      __dirname,
      'src',
      'node_modules',
    ],
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/assets/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = devConfig;
