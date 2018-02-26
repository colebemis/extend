const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        ignore: ['.DS_Store'],
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
  ]
}
