const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const ExtensionReloader = require("webpack-extension-reloader");
const { cwd } = require("process");
const WORKING_DIR = cwd();
const OUTPUT_DIR = `${WORKING_DIR}/dist`;

module.exports = function (env) {
  return {
    mode: "production",
    devtool: "inline-source-map",
    watch: true,
    resolve: {
      extensions: [".js", ".ts"],
    },
    entry: {
      background: `${WORKING_DIR}/src/js/background.ts`,
      content: `${WORKING_DIR}/src/js/content.ts`,
      popup: `${WORKING_DIR}/src/js/popup.ts`,
      options: `${WORKING_DIR}/src/js/options.ts`,
    },
    output: {
      path: OUTPUT_DIR,
      filename: "js/[name].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${WORKING_DIR}/src/pages/options.html`,
        inject: "body",
        filename: "pages/options.html",
        chunks: ["options"],
      }),
      new HtmlWebpackPlugin({
        template: `${WORKING_DIR}/src/pages/popup.html`,
        inject: "body",
        filename: "pages/popup.html",
        chunks: ["popup"],
      }),
      new ProgressPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${WORKING_DIR}/node_modules/webextension-polyfill/dist/browser-polyfill.js`,
            to: `${OUTPUT_DIR}/assets/browser-polyfill.js`,
          },
          {
            from: `${WORKING_DIR}/src/manifest.json`,
            to: `${OUTPUT_DIR}/manifest.json`,
            toType: "file",
          },
          {
            from: `${WORKING_DIR}/src/assets`,
            to: `${OUTPUT_DIR}/assets`,
          },
        ],
      }),
      new ExtensionReloader({
        entries: {
          contentScript: "content",
          background: "background",
          extensionPage: "popup",
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: "ts-loader",
              options: { configFile: `${cwd()}/tsconfig.json` },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.png|jpe?g$/,
          use: [
            {
              loader: "url-loader",
              options: {
                // Only inline if smaller than 5kb
                limit: 5000,
              },
            },
          ],
        },
      ],
    },
  };
};
