const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
  entry: {
    ui: "./src/ui.tsx",
    code: "./src/code.ts",
  },
  cache: false,
  mode: argv.mode === "production" ? "production" : "development",
  devtool: argv.mode === "production" ? false : "inline-source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },
  output: {
    filename: "code.js",
    path: path.resolve(__dirname, "lib"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new HtmlWebpackPlugin({
      template: "./src/ui.html",
      filename: "ui.html",
      inlineSource: ".(js)$",
      chunks: ["ui"],
    }),
  ],
});
