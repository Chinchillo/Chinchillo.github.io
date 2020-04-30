const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  const { NODE_ENV } = process.env;

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist", "bundle"),
      filename: "bundle.js",
      publicPath: "bundle"
    },
    mode: NODE_ENV,
    devtool: NODE_ENV === "development" ? "source-map" : "none",
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: {
            loader: "babel-loader"
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    devServer: {
      overlay: true,
      port: 9000,
      contentBase: path.resolve(__dirname, "dist"),
      historyApiFallback: true
    },
    plugins: [
      new Dotenv()
    ]
  };
};
