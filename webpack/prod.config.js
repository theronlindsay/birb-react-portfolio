const path = require("path");
const { merge } = require("webpack-merge");
const autoprefixer = require("autoprefixer");
const webpackCommon = require("./common.config");

// webpack plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");

module.exports = merge(webpackCommon, {
  bail: true,

  devtool: "source-map",
  mode: "production",  output: {
    path: path.resolve(__dirname, "../dist"),

    filename: "[name]-[contenthash].min.js",

    sourceMapFilename: "[name]-[contenthash].map",

    chunkFilename: "[id]-[contenthash].js",

    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js")
              },
              sourceMap: true
            }
          },          {
            loader: "sass-loader",
            options: {
              api: 'modern',
              sourceMap: true
            }
          }
        ]
      }
    ]  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          }
        },
        extractComments: false,
      })
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../static/index.html"),
      favicon: path.resolve(__dirname, "../static/favicon.ico"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, "../static"),
          globOptions: {
            ignore: ["**/index.html", "**/favicon.ico"]
          }
        }
      ]
    }),    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].min.css"
    })
  ]
});
