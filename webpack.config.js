const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
  entry: { index: path.resolve(__dirname, "./src/index.ts") },
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    watchFiles: ["*.html"],
  },
});
