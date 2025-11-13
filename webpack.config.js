import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'

/** @type {import('webpack').Configuration} */
export default {
  entry: path.resolve('src', 'main.tsx'),
  target: 'web',
  mode: NODE_ENV,
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js'
    // clean: false // using CleanWebpackPlugin conditionally instead
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('index.html'),
      filename: 'index.html'
    }),
    ...(isProd
      ? [
          new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
          new CleanWebpackPlugin()
        ]
      : [])
  ],
  optimization: {
    ...(isProd
      ? {
          minimize: true,
          minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
          splitChunks: {
            cacheGroups: {
              default: false,
              vendor: {
                test: /node_modules/,
                chunks: 'all',
                name: 'vendor',
                enforce: true
              }
            }
          }
        }
      : {})
  },
  devServer: {
    static: { directory: path.resolve('dist') },
    watchFiles: path.resolve('src', '**'),
    port: 3000
  }
}
