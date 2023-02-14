/* Development config:
   ========================================================================== */

const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.js");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  // watch: 'only',
  watchOptions: {
    ignored: /[\\/]node_modules[\\/]/
  },
  target: 'web',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../src'),
      watch: true,
    },
    port: 8082,
    hot: false,
    liveReload: true,
    historyApiFallback: true, // включаем историю, при использовании index.html
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      template: path.resolve(__dirname, '../src/html/views/index.html')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
