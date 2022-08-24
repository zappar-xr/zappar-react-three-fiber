const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "umd"),
    filename: "zappar-react-three-fiber.js",
    library: "ZapparR3F",
    libraryTarget: "umd",
  },
  resolve: {
    alias: {
      "three": path.resolve(__dirname, "node_modules/three"),
    },
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".wasm"],
  },
  plugins: [],
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [
          /node_modules/,
          /\.d\.ts$/
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
