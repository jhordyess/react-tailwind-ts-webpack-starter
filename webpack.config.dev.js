import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

/** @type {import('webpack').Configuration} */
export default {
  entry: path.resolve('src', 'main.tsx'),
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
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
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('index.html'),
      filename: 'index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.resolve('dist')
    },
    watchFiles: path.resolve('src', '**'),
    port: 3640
  }
}
