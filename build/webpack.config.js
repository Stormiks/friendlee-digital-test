const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function generateHtmlPlugins(templateDir) {
  console.log('====================================');
  console.log(path.resolve(__dirname, templateDir));
  console.log('====================================');
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  return templateFiles.map((item) => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    });
  });
}

const htmlPlugins = generateHtmlPlugins("../src/html/views");

const PATHS = {
  dist: path.resolve(__dirname, '../dist'),
  srcAssets: path.resolve(__dirname, '../src/assets/'),
  src: path.resolve(__dirname, '../src'),
  srcAppJs: path.resolve(__dirname, '../src/main.js'),
  assets: 'assets/',
  assetsFonts: 'assets/fonts',
  assetsImg: 'assets/img',
  assetsSvg: 'assets/svg',
  assetsScss: 'assets/scss',
  assetsCss: 'assets/css',
  srcAssetsLess: path.resolve(__dirname, '../src/assets/less'),
  srcAssetsScss: path.resolve(__dirname, '../src/assets/scss'),
  srcAssetsCss: path.resolve(__dirname, '../src/assets/css'),
  srcAssetsImg: path.resolve(__dirname, '../src/assets/img'),
  // srcAssetsSvg: path.resolve(__dirname, '../src/assets/svg')
};

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: [`${PATHS.src}/main.js`, path.resolve(`${PATHS.srcAssetsScss}/style.scss`)]
  },
  output: {
    path: PATHS.dist,
    filename: "assets/js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: PATHS.srcAssetsCss,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        include: PATHS.srcAssetsScss,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "../src/html/includes"),
        use: "raw-loader",
      },
    ]
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assetsCss}/[name].css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: `${PATHS.src}/${PATHS.assetsImg}`,
        //   to: `${PATHS.assetsImg}`
        // },
        {
          from: `${PATHS.src}/${PATHS.assetsFonts}`,
          to: `${PATHS.assetsFonts}`
        },
        // {
        //   from: `${PATHS.src}/${PATHS.assetsSvg}`,
        //   to: `${PATHS.assetsSvg}`
        // }
      ]
    }),
    ...htmlPlugins
  ],
};
