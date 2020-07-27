const CompressionWebpackPlugin = require("compression-webpack-plugin");
export default function () {
  return {
    plugins: [new CompressionWebpackPlugin()],
  };
}
