const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config.base");

baseConfig.devtool = 'eval-cheap-source-map';

baseConfig.entry = {
  imageTracking: "./tests/imageTracking.tsx",
  instantTracking: "./tests/instantTracking.tsx",
  faceTracking: "./tests/faceTracking.tsx",
  faceTrackingHelmet: "./tests/faceTrackingHelmet.tsx",
  faceLandmarks: "./tests/faceLandmarks.tsx",
  anchorOrigin: "./tests/anchorOrigin.tsx",
  routes : "./tests/routes.tsx",
  simple_face : "./tests/simple-face.tsx",
  simple_image : "./tests/simple-image.tsx"
};

baseConfig.output = {
  filename: "[name].js",
  path: `${__dirname}test-dist`,
};

baseConfig.plugins = [
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "imageTracking.html",
    chunks: ["imageTracking"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "instantTracking.html",
    chunks: ["instantTracking"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "faceTracking.html",
    chunks: ["faceTracking"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "faceTrackingHelmet.html",
    chunks: ["faceTrackingHelmet"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "faceLandmarks.html",
    chunks: ["faceLandmarks"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "anchorOrigin.html",
    chunks: ["anchorOrigin"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "routes.html",
    chunks: ["routes"],
  }),
  new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "simple-face.html",
    chunks: ["simple_face"],
  }),
    new HtmlWebpackPlugin({
    template: "./tests/index.html",
    filename: "simple-image.html",
    chunks: ["simple_image"],
  }),
];

baseConfig.devServer = {
  hot: true,
  // open: true,
  contentBase: "./test-dist",
  https: true,
  host: "0.0.0.0",
  hot: true,
};

baseConfig.output.path = path.resolve(__dirname, "test-dist");
module.exports = baseConfig;
