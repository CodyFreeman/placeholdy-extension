const merge = require("webpack-merge").merge;
const baseConfig = require("./webpack/configs/base.webpack.config");
const devConfig = require("./webpack/configs/dev.webpack.config");
const prodConfig = require("./webpack/configs/prod.webpack.config");

const PresetManager = require("./webpack/PresetManager").PresetManager;

// TODO: Move to utils
function arrayFromCsv(presets) {
  if (!presets || !presets.length) {
    return [];
  }
  return [].concat(...presets.split(","));
}

module.exports = function (env = { mode: "production", presets: "" }) {
  const parsedEnv = Object.assign({}, env, {
    presets: arrayFromCsv(env.presets),
  });
  // TODO: Consider moving to dynamic require to allow any number of configs (see presets)
  const envConfig = env.mode === "development" ? devConfig : prodConfig;
  return merge(
    {},
    baseConfig(parsedEnv),
    envConfig(parsedEnv),
    new PresetManager().loadPresets(parsedEnv)
  );
};
