const path = require("path");

module.exports = {
  mode: "development",
  target: "web",
  entry: "./src/client.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "client.bundle.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
