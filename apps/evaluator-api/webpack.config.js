const {
  getOptions,
  getPlugins,
} = require('../../scripts/webpack/nest-http-api.webpack.config');

module.exports = function (options, webpack) {
  return {
    ...options,
    ...getOptions(),
    plugins: [...options.plugins, ...getPlugins({ options, webpack })],
  };
};
