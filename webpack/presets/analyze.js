const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = function () {
  return {
    plugins: [new BundleAnalyzerPlugin()],
  };
};
