const path = require("path");
const webpack = require("webpack");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
  entry: {
    ui: "./src/ui.tsx",
    code: "./src/code.ts",
  },
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
    filename: "[name].js",
    path: path.resolve(__dirname, "lib"),
    // Workaround: https://github.com/DustinJackson/html-webpack-inline-source-plugin/issues/57#issuecomment-603218420
    publicPath: "",
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/ui.html",
      filename: "ui.html",
      inlineSource: ".(js|css)$",
      cache: false,
      minify: false,
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
});
