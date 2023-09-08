const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

// config helpers:
const ensureArray = (config) => (config && (Array.isArray(config) ? config : [config])) || [];
const when = (condition, config, negativeConfig) => (condition ? ensureArray(config) : ensureArray(negativeConfig));

// Log environment to console
(() => {
  const environment = process.env.NODE_ENV || '';
  // Console colors
  const colors = { reset: '\x1b[0m', fb: { blue: '\x1b[34m' } };
  const width = 120;
  const line = '-'.repeat(width);
  const numberOfSpaces = (width - environment.length) / 2;
  const leftSpaces = ' '.repeat(Math.floor(numberOfSpaces));
  const rightSpaces = ' '.repeat(Math.ceil(numberOfSpaces));
  console.log(`${colors.fb.blue}%s${colors.reset}`, `\n${line}\n${leftSpaces}${environment}${rightSpaces}\n${line}\n`);
})();

const production = process.env.NODE_ENV === 'production';

const env = {
  // Deployment
  __OPEN_API__: process.env.__OPEN_API__ !== undefined ? process.env.__OPEN_API__ === 'true' : false, // __OPEN_API__ should be only set in dev server and local.
  __CORS__: process.env.__CORS__ !== undefined ? process.env.__CORS__ === 'true' : false, // this should not be enabled in production servers
};

console.log(JSON.stringify(env, null, 2), '\n');

const gitVersion = (() => {
  const gitRevisionPlugin = new GitRevisionPlugin({ lightweightTags: true });
  try {
    return gitRevisionPlugin.version();
  } catch (e) {
    return require('./package.json').version;
  }
})();

const debug = !production && !!process.env.DEBUG;

const getOptions = () => ({
  devtool: production ? 'source-map' : 'inline-source-map',
  entry: [...when(!production, 'webpack/hot/poll?100'), './src/main.ts'],
  watch: !production,
  externals: [
    nodeExternals({
      modulesFromFile: production,
      allowlist: ['webpack/hot/poll?100', /^@app\//],
    }),
  ],
});

const getPlugins = ({ options, webpack }) => [
  new webpack.DefinePlugin({
    __GIT_VERSION__: JSON.stringify(gitVersion),
    __BUILD_TIME__: new Date().getTime(),
    // Flags
    __PRODUCTION__: production,
    __CORS__: env.__CORS__,
    __OPEN_API__: env.__OPEN_API__,
  }),
  new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
  ...when(!production, [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      name: options.output.filename,
      ...(debug ? { nodeArgs: ['--inspect=0.0.0.0:9229'] } : {}),
    }),
  ]),
];

module.exports = { getOptions, getPlugins };
