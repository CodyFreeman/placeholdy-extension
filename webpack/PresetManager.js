const { merge } = require("webpack-merge");

module.exports.PresetManager = class PresetManager {
  loadPresets(env) {
    const { presets } = env;
    if (!presets || !presets.length) {
      return {};
    }
    const mergedPresets = [].concat(...[presets]);
    const configs = mergedPresets.map((name) => {
      return require(`./presets/${name}`).default(env);
    });
    return merge({}, ...configs);
  }
};
