const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/static';
module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, "../src/index.js"),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath,
  },
  devServer: {
    publicPath,
    inline: true,
    hot: true,
    // 设置historyApiFallback。使得我们用reactrouter browserhistroy的时候能找到我们的html
    historyApiFallback: { // 404s will fallback to /static/index.html
      index: `${publicPath}/index.html`,
    }
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.json', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react', '@babel/env'],
          plugins: ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ] 
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),
      filename: 'index.html'
    })
  ]
}